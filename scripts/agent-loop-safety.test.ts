import assert from "node:assert/strict";
import test from "node:test";
import { resolveResponseDisposition } from "../src/renderer/components/mainContent/chatMessages/utils/responseDisposition.ts";

test("an empty provider completion is terminal incomplete, not silent success", () => {
  assert.deepEqual(
    resolveResponseDisposition({
      status: "completed",
      content: "",
      thinking: "",
      toolCallsJson: "[]",
    }),
    {
      kind: "incomplete",
      variant: "empty",
      reason: "unknown",
      recoveryOutcome: null,
      mayExecuteTools: false,
      mayContinueLoop: false,
    },
  );
});

test("a tool-only completion remains executable", () => {
  const result = resolveResponseDisposition({
    status: "completed",
    content: "",
    toolCallsJson: '[{"name":"filesystem-read"}]',
  });
  assert.equal(result.kind, "complete");
  assert.equal(result.mayExecuteTools, true);
});
