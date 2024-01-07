import { createDraftSafeSelector } from "@reduxjs/toolkit";

export default createDraftSafeSelector((state) => state, (state) => state.userSlice)