# AI Backend Plan

## Current Architecture Summary
- The current app uses `generateAzulResponse()` in `src/services/azulAgent.ts` as the active local intelligence engine.
- The UI calls that function from `App.tsx` after the user taps `Analyze`.
- The response shape already matches the current `ProtocolResponseCard` UI:
  - `clinicalRead`
  - `bestStartingProtocol`
  - `padPlacement`
  - `whyThisPlacement`
  - `sessionTips`
  - `aftercare`
  - `escalation`
  - `recommendAssessment`
- The current local engine should remain available as a fallback even after a backend AI service exists.

## Current Frontend Request Shape
The frontend already has enough context for a secure AI request.
Suggested request payload:

```json
{
  "userQuestion": "rotator cuff pain and stiffness",
  "activeDeviceModel": "Home Model",
  "vibeJournalData": {
    "painBefore": 40,
    "painAfter": 18,
    "focusBefore": 52,
    "focusAfter": 78,
    "stressBefore": 63,
    "stressAfter": 28
  },
  "selectedBodyArea": "Shoulder",
  "userMode": "client"
}
```

## Suggested Future Endpoint
`POST /api/azul-agent/respond`

## Suggested Backend Request Contract
- `userQuestion: string`
- `activeDeviceModel: DeviceModel`
- `vibeJournalData: VibeJournalData`
- `selectedBodyArea?: string`
- `userMode: "client" | "practitioner"`

## Suggested Backend Response Contract
The backend should return the same structured shape already consumed by the app:
- `clinicalRead: string[]`
- `bestStartingProtocol: string[]`
- `padPlacement: string[]`
- `whyThisPlacement: string[]`
- `sessionTips: string[]`
- `aftercare: string[]`
- `escalation: string[]`
- `recommendAssessment: boolean`

This keeps the UI stable and allows the current `ProtocolResponseCard` to continue working without redesign.

## Clinical Safety Guardrails
The backend AI must:
- avoid diagnosis claims
- avoid cure claims
- recommend medical care for red flags
- recommend Lavelle assessment for complex or professional-only cases
- respect device model limitations
- preserve layman-first pad placement language
- return structured sections compatible with `ProtocolResponseCard`
- avoid implying that Azul replaces medical care

## Escalation Rules
The backend should recommend `recommendAssessment: true` when:
- symptoms are complex or not improving
- red flags are present
- device limitations make the current guidance insufficient
- professional or Clinical Suite sequencing is more appropriate
- vascular, neurological, severe swelling, or major function-loss language appears

## No API Keys In Frontend
Provider API keys, model credentials, and prompt orchestration secrets must live on the backend/server only.
The frontend app must never embed:
- OpenAI keys
- Anthropic keys
- provider endpoints requiring secrets
- hidden system prompts intended to be private

## Fallback Strategy
The current local `generateAzulResponse()` engine should remain available as a fallback for:
- offline or degraded backend conditions
- development mode
- safe first-build continuity
- regression protection during backend rollout

Suggested future flow:
1. Frontend calls secure backend client.
2. Backend returns structured Azul response.
3. If backend fails or times out, frontend falls back to local `generateAzulResponse()`.

## What The Frontend Should Keep Stable
The following should remain stable even when the backend is introduced:
- `Analyze` button behavior
- current response card UI
- body map context passing
- saved session history shape
- assessment email flow
- vibe journal data shape

## Current Call Site
The active call path today is:
- `App.tsx`
- `handleAnalyze()`
- `generateAzulResponse({...})`

That call site can later be swapped to:
- try `requestAzulAgentResponse(request)` first
- fallback to `generateAzulResponse(request)`

## Recommended Next Backend Step
Build a secure server endpoint that accepts `AzulAgentRequest`, returns `AzulAgentResponse`, and enforces the safety guardrails above before the frontend is updated to call it.
