import React from "react";

import { useParams } from "react-router-dom";

function SessionDetail() {
  const { sessionId } = useParams();
  return <div>SessionDetail {sessionId}</div>;
}

export default SessionDetail;
