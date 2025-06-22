"use client";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useConnectionStatus,
  useSidebar,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Skeleton,
  useBinaryState,
} from "@ssword/ui/client";

import { SidebarOpenIcon, SidebarCloseIcon, ChevronDown } from "lucide-react";
import { Icon } from "@/app/config";
import { Frame } from "@ssword/ui/client";

function SiteNavigation() {
  const connection = useConnectionStatus();
  const { state: devToolsEnabled, toggle: toggleDevtools } =
    useBinaryState(false);
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="offcanvas" variant="sidebar" className="fixed">
      <SidebarHeader className="bg-sidebar/95">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span className="flex items-center gap-2">
                    <span className="text-lg font-bold"><Icon /></span>
                    ssword.dev
                  </span>
                  <SidebarMenuBadge>&copy;</SidebarMenuBadge>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={toggleSidebar}
                  tooltip="Toggle sidebar"
                >
                  {open ? <SidebarCloseIcon /> : <SidebarOpenIcon />}
                  <span className="ml-2">Toggle Sidebar</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Tutorial
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Web Stack</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <SidebarGroup>
          <SidebarGroupLabel>Others</SidebarGroupLabel>
          <SidebarGroupContent>{/* add more items here */}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-secondary p-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
              <div className="flex items-center gap-2">
                    <Frame preset="avatar">
                      <Avatar className="h-6 w-6 rounded-full">
                        <AvatarImage src="/icons/localuser.png" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Frame>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Local User</span>
                      <span className="text-muted-foreground text-xs">
                        {connection}
                      </span>
                    </div>
                  </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      sidebarWidth="20rem"
      sidebarKeyboardShortcut="b"
      sidebarIconWidth="4rem"
      sidebarWidthMobile="16rem"
    >
      <SiteNavigation />
      <Frame className="" orientation="portrait">
        <SidebarInset>{children}</SidebarInset>
      </Frame>
    </SidebarProvider>
  );
}

export { SiteLayout };
