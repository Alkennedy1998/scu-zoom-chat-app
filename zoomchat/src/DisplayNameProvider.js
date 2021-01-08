import React, { useEffect, useState } from "react";

export const DisplayNameContext = React.createContext({
  anonDisplayName: null,
  updateDisplayName:()=>{}
});
