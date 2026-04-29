import type { AzulAgentRequest, AzulAgentResponse } from './azulAgentTypes';

export async function requestAzulAgentResponse(
  _request: AzulAgentRequest
): Promise<AzulAgentResponse> {
  // Future secure backend integration point:
  // return fetch('/api/azul-agent/respond', { method: 'POST', body: JSON.stringify(request) })
  //   .then((response) => response.json())
  // API keys and model provider credentials must live on the backend/server only.
  // The mobile/frontend app should never embed provider secrets.

  throw new Error(
    'requestAzulAgentResponse is a future backend stub. The app should continue using the local generateAzulResponse() engine for now.'
  );
}
