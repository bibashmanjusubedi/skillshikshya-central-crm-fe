// // import api from "@/lib/api";
// import { api } from "@/lib/api";
// import type { CallFilterParams, CallItem, CallSummaryResponse } from "@/types/calls";

// export const callsService = {
//   /**
//    * Fetch paginated & filtered call log list (US-2)
//    */
//   getCalls: async (params: CallFilterParams) => {
//     const response = await api.get<{
//       count: number;
//       results: CallItem[];
//     }>("/calls/", { params });
//     return response.data;
//   },

//   /**
//    * Fetch call activity summary metrics and chart data (US-1)
//    */
//   getSummary: async (params: Omit<CallFilterParams, "page" | "page_size" | "ordering">) => {
//     const response = await api.get<CallSummaryResponse>("/api/calls/summary/", { params });
//     return response.data;
//   },

//   /**
//    * Download filtered calls as a CSV spreadsheet (US-4)
//    * Uses responseType: "blob" to properly handle binary streams & refresh auth cookies
//    */
//   exportCsv: async (params: Omit<CallFilterParams, "page" | "page_size">) => {
//     const response = await api.get("/api/calls/export/", {
//       params,
//       responseType: "blob",
//     });

//     const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");

//     const todayStr = new Date().toISOString().slice(0, 10);
//     link.href = url;
//     link.setAttribute("download", `calls-${todayStr}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     window.URL.revokeObjectURL(url);
//   },
// };

import { api } from "@/lib/api";
import type { CallFilterParams, CallItem, CallSummaryResponse } from "@/types/calls";

export const callsService = {
  /**
   * Fetch paginated & filtered call log list (US-2)
   */
  getCalls: async (params: CallFilterParams) => {
    const response = await api.get<{
      count: number;
      results: CallItem[];
    }>("/calls/", { params }); // Changed from "/api/calls/"
    return response.data;
  },

  /**
   * Fetch call activity summary metrics and chart data (US-1)
   */
  getSummary: async (params: Omit<CallFilterParams, "page" | "page_size" | "ordering">) => {
    const response = await api.get<CallSummaryResponse>("/calls/summary/", { params }); // Changed from "/api/calls/summary/"
    return response.data;
  },

  /**
   * Download filtered calls as a CSV spreadsheet (US-4)
   */
  exportCsv: async (params: Omit<CallFilterParams, "page" | "page_size">) => {
    const response = await api.get("/calls/export/", { // Changed from "/api/calls/export/"
      params,
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    const todayStr = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.setAttribute("download", `calls-${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};