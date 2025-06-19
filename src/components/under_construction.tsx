import { Frame } from "@ssword/ui/client";

/**
 * A lazy way to tell our clients that this page doesnt exists
 * or is WIP
 */
export default function NotImplementedPage() {
  return (
    <main className="scrollbar:disable flex w-screen flex-col items-center justify-center gap-3 overflow-x-hidden lg:flex-row">
      <Frame className="max-w-screen min-w-0 flex-col items-center justify-center lg:flex-row">
        {/* Page under construction */}
        <div className="flex flex-1 flex-col items-center justify-center py-20">
          <span className="text-3xl font-bold text-gray-400">
            🚧 Page Under Construction 🚧
          </span>
          <p className="mt-4 text-lg text-gray-500">
            Check back soon for updates!
          </p>
        </div>
      </Frame>
    </main>
  );
}
