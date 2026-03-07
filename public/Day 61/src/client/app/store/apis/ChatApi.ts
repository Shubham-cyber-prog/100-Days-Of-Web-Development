import { apiSlice } from "../slices/ApiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET /chat/:id
    getChat: builder.query({
      query: (id: string) => `/chat/${id}`,
    }),

    // GET /chat/user/:userId
    getUserChats: builder.query({
      query: () => `/chat/user`,
    }),

    // GET /chat
    getAllChats: builder.query({
      query: () => "/chat",
    }),

    // POST /chat
    createChat: builder.mutation({
      query: () => ({
        url: "/chat",
        method: "POST",
      }),
    }),

    // POST /chat/:chatId/message
    sendMessage: builder.mutation({
      query: ({
        chatId,
        content,
        file,
      }: {
        chatId: string;
        content?: string;
        file?: File;
      }) => {
        const formData = new FormData();
        formData.append("chatId", chatId);
        if (content) formData.append("content", content);
        if (file) formData.append("file", file);
        return {
          url: `/chat/${chatId}/message`,
          method: "POST",
          body: formData,
        };
      },
    }),
    // PATCH /chat/:chatId/status
    updateChatStatus: builder.mutation({
      query: ({
        chatId,
        status,
      }: {
        chatId: string;
        status: "OPEN" | "RESOLVED";
      }) => ({
        url: `/chat/${chatId}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetChatQuery,
  useGetUserChatsQuery,
  useGetAllChatsQuery,
  useCreateChatMutation,
  useSendMessageMutation,
  useUpdateChatStatusMutation,
} = chatApi;
