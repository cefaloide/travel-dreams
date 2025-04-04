import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "./page";
import { mockTrips } from "@/__mocks__/mockTrips";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockTrips),
  })
) as jest.Mock;

describe("Page Component", () => {
  it("renders the Trips component with fetched data", async () => {
    render(await Page());

    await waitFor(() => {
      expect(screen.getByText(mockTrips[0].title)).toBeInTheDocument();
    });
  });
});
