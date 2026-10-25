import { describe, expect, it } from "vite-plus/test";
import { BRAND_NAME, brandText } from "./brand";

describe("brandText", () => {
  it("replaces the product name in app copy", () => {
    expect(brandText("Sign in to Kaneo", "auth:signIn.heading")).toBe(
      `Sign in to ${BRAND_NAME}`,
    );
  });

  it("keeps the casing style of shouted labels", () => {
    expect(brandText("KANEO")).toBe(BRAND_NAME.toUpperCase());
  });

  it("leaves the webhook header name and lowercase identifiers alone", () => {
    expect(
      brandText(
        "Kaneo signs each request and sends the X-Kaneo-Signature header.",
      ),
    ).toBe(
      `${BRAND_NAME} signs each request and sends the X-Kaneo-Signature header.`,
    );
    expect(brandText("Add kaneo-cli to DEVICE_AUTH_CLIENT_IDS")).toBe(
      "Add kaneo-cli to DEVICE_AUTH_CLIENT_IDS",
    );
  });

  it("keeps Kaneo where it means the upstream product", () => {
    expect(
      brandText("Another Kaneo", [
        "settings:workspaceImport.sources.kaneo.pickerName",
      ]),
    ).toBe("Another Kaneo");
    expect(
      brandText("Kaneo URL", "settings:workspaceImport.kaneo.urlLabel"),
    ).toBe("Kaneo URL");
  });
});
