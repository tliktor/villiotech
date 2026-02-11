import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';

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

  try {
    const result = await dynamodb.send(new GetItemCommand({
      TableName: TABLE_NAME,
      Key: { ip: { S: ip } }
    }));

    let count = 1;
    let lastReset = now;

    if (result.Item) {
      const existingReset = parseInt(result.Item.lastReset.N!);
      if (existingReset >= windowStart) {
        count = parseInt(result.Item.count.N!) + 1;
        lastReset = existingReset;
      }
    }

    await dynamodb.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        ip: { S: ip },
        count: { N: count.toString() },
        lastReset: { N: lastReset.toString() },
        ttl: { N: Math.floor((now + 24 * 60 * 60 * 1000) / 1000).toString() }
      }
    }));
  } catch (error) {
    console.error('Rate limit update failed:', error);
  }
}