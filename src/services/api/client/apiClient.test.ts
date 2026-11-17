const loadApiClient = async () => {
  vi.resetModules();
  const { apiClient } = await import("./apiClient");

  return apiClient;
};

describe("apiClient", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("when VITE_API_URL is not set", () => {
    it("talks to the API running locally", async () => {
      vi.stubEnv("VITE_API_URL", "");

      const apiClient = await loadApiClient();

      expect(apiClient.defaults.baseURL).toBe("http://localhost/api/v1");
    });
  });

  describe("when VITE_API_URL is set", () => {
    it("talks to the API at that address", async () => {
      vi.stubEnv("VITE_API_URL", "https://api.example.com/api/v1");

      const apiClient = await loadApiClient();

      expect(apiClient.defaults.baseURL).toBe("https://api.example.com/api/v1");
    });
  });

  describe("when the API takes too long to answer", () => {
    it("gives up after 10 seconds", async () => {
      const apiClient = await loadApiClient();

      expect(apiClient.defaults.timeout).toBe(10_000);
    });
  });
});
