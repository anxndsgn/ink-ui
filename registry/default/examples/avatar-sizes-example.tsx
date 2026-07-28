import { Avatar, AvatarFallback, AvatarImage } from "registry/default/ui/avatar";

export function AvatarSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar size="sm">
        <AvatarImage alt="@ink-ui" src="https://github.com/shadcn.png" />
        <AvatarFallback>IU</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@ink-ui" src="https://github.com/shadcn.png" />
        <AvatarFallback>IU</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage alt="@ink-ui" src="https://github.com/shadcn.png" />
        <AvatarFallback>IU</AvatarFallback>
      </Avatar>
    </div>
  );
}
