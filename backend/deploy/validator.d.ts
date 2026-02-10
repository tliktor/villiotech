interface ValidationResult {
    valid: boolean;
    errors: Record<string, string>;
}
export declare function validateContactForm(data: unknown): ValidationResult;
export declare function sanitize(input: string): string;
export {};
//# sourceMappingURL=validator.d.ts.map