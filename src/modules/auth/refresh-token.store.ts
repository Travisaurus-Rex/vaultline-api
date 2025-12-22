//temporary since there's no cache or db yet

export class RefreshTokenStore {
  private static tokens = new Set<string>();

  static add(token: string) {
    this.tokens.add(token);
  }

  static remove(token: string) {
    this.tokens.delete(token);
  }

  static has(token: string): boolean {
    return this.tokens.has(token);
  }
}
