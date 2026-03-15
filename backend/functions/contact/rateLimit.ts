import { DynamoDBClient, UpdateItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';

const dynamodb = new DynamoDBClient({ region: 'eu-central-1' });
const TABLE_NAME = 'ContactRateLimit';
const RATE_LIMIT = 3;
const WINDOW_HOURS = 1;

export async function checkRateLimit(ip: string): Promise<boolean> {
  const now = Date.now();
  const windowStart = now - (WINDOW_HOURS * 60 * 60 * 1000);

  try {
    const result = await dynamodb.send(new GetItemCommand({
      TableName: TABLE_NAME,
      Key: { ip: { S: ip } }
    }));

    if (!result.Item) return true;

    const lastReset = parseInt(result.Item.lastReset.N!);
    const count = parseInt(result.Item.count.N!);

    if (lastReset < windowStart) return true;
    return count < RATE_LIMIT;
  } catch {
    return true;
  }
}

export async function updateRateLimit(ip: string): Promise<void> {
  const now = Date.now();
  const windowStart = now - (WINDOW_HOURS * 60 * 60 * 1000);
  const ttl = Math.floor((now + 24 * 60 * 60 * 1000) / 1000);

  try {
    // Try atomic increment within current window
    await dynamodb.send(new UpdateItemCommand({
      TableName: TABLE_NAME,
      Key: { ip: { S: ip } },
      UpdateExpression: 'SET #count = if_not_exists(#count, :zero) + :one, #ttl = :ttl',
      ConditionExpression: 'attribute_exists(lastReset) AND lastReset >= :windowStart',
      ExpressionAttributeNames: { '#count': 'count', '#ttl': 'ttl' },
      ExpressionAttributeValues: {
        ':one': { N: '1' },
        ':zero': { N: '0' },
        ':ttl': { N: ttl.toString() },
        ':windowStart': { N: windowStart.toString() },
      },
    }));
  } catch (error: any) {
    if (error.name === 'ConditionalCheckFailedException') {
      // Window expired or new IP — reset counter
      await dynamodb.send(new UpdateItemCommand({
        TableName: TABLE_NAME,
        Key: { ip: { S: ip } },
        UpdateExpression: 'SET #count = :one, lastReset = :now, #ttl = :ttl',
        ExpressionAttributeNames: { '#count': 'count', '#ttl': 'ttl' },
        ExpressionAttributeValues: {
          ':one': { N: '1' },
          ':now': { N: now.toString() },
          ':ttl': { N: ttl.toString() },
        },
      }));
    } else {
      console.error('Rate limit update failed:', error);
    }
  }
}
