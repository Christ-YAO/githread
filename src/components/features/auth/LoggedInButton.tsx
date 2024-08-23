"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User2 } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export type LoggedInButtonProps = {
  user: Session["user"];
};

export const LoggedInButton = (props: LoggedInButtonProps) => {
  return (
    <DropdownMenu>
      <AlertDialog>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-primary border-accent border">
            <Avatar size="default" className="sm:mr-2 h-6 w-6">
              <AvatarFallback>{props.user?.name?.[0]}</AvatarFallback>
              {props.user.image && (
                <AvatarImage
                  src={props.user.image}
                  alt={props.user.name ?? "user picture"}
                />
              )}
            </Avatar>
            <span className="hidden sm:block">{props.user.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User2 className="mr-2" size={12} />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem>
              <LogOut className="mr-2" size={12} />
              Logout
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button variant="secondary">Cancel</Button>
            </AlertDialogCancel>
            <LogoutButton />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenu>
  );
};
