import AppNav from "@/components/AppNav";
import ChatInterface from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <AppNav />

      <main className="lg:pl-64 flex-1 flex flex-col pb-20 lg:pb-0">
        <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-6 lg:py-8 min-h-[calc(100vh-3.5rem)] lg:min-h-screen">
          <div className="flex-1 flex flex-col rounded-2xl border border-navy-700/50 bg-navy-900/60 backdrop-blur-sm p-4 sm:p-6 min-h-0">
            <ChatInterface />
          </div>
        </div>
      </main>
    </div>
  );
}
