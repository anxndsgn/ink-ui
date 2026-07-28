import { Avatar, AvatarFallback, AvatarImage } from "registry/default/ui/avatar";

export function AvatarExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar>
        <AvatarImage alt="@ink-ui" src="https://github.com/shadcn.png" />
        <AvatarFallback>IU</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@base-ui" src="https://github.com/base-ui.png" />
        <AvatarFallback>BU</AvatarFallback>
      </Avatar>
    </div>
  );
}
