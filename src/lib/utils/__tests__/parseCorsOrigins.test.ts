import { parseCorsOrigins } from "@/lib/utils/adapters/parseCorsOrigins.util";

describe("check CORS-Origins parser functionality", () => {
  it("should return valid origins from a semicolon-separated string", () => {
    const origins = "http://example.com;https://example.org;invalid-origin;http://localhost:3000";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.com",
      "https://example.org",
      "http://localhost:3000",
    ]);
  });

  it("should return an empty array if no valid origins are provided", () => {
    const origins = "invalid-origin1;invalid-origin2";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([]);
  });

  it("should trim spaces around origins", () => {
    const origins = "  http://example.com  ;  https://example.org  ; invalid-origin ";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.com",
      "https://example.org",
    ]);
  });

  it("should handle an empty string", () => {
    const origins = "";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([]);
  });

  it("should handle a single valid origin", () => {
    const origins = "http://example.com";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual(["http://example.com"]);
  });

  it("should handle a single invalid origin", () => {
    const origins = "invalid-origin";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([]);
  });

  it("should return all valid origins including duplicates", () => {
    const origins = "http://example.com;http://example.com;https://example.org";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.com",
      "http://example.com",
      "https://example.org",
    ]);
  });

  it("should handle a combination of spaces and invalid characters", () => {
    const origins = "  http://example.com ;invalid-origin; https://example.org ; invalid-origin ";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.com",
      "https://example.org",
    ]);
  });

  it("should handle origins with subdomains", () => {
    const origins = "http://sub.example.com;https://sub.example.org";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://sub.example.com",
      "https://sub.example.org",
    ]);
  });

  it("should handle origins with different ports", () => {
    const origins = "http://example.com:8080;https://example.org:3000";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.com:8080",
      "https://example.org:3000",
    ]);
  });

  it("should handle origins with specific paths", () => {
    const origins = "http://example.com/path;https://example.org/anotherpath";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.com/path",
      "https://example.org/anotherpath",
    ]);
  });

  it("should handle origins that are stuck together without a delimiter", () => {
    const origins = "http://example.comhttps://example.org";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.comhttps://example.org"
    ]);
  });

  it("should handle multiple origins with query parameters", () => {
    const origins = "http://example.com?param=value;https://example.org?foo=bar;http://localhost:3000?test=true";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.com?param=value",
      "https://example.org?foo=bar",
      "http://localhost:3000?test=true",
    ]);
  });

  it("should handle multiple origins with query parameters and fragment identifiers", () => {
    const origins = "http://example.com?param=value#section1;https://example.org?foo=bar#section2;http://localhost:3000?test=true#section3";
    const result = parseCorsOrigins(origins);
    expect(result).toEqual([
      "http://example.com?param=value#section1",
      "https://example.org?foo=bar#section2",
      "http://localhost:3000?test=true#section3",
    ]);
  });
});