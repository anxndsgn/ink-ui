import { Avatar, AvatarFallback, AvatarImage } from "registry/default/ui/avatar";

export function AvatarFallbackExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Avatar>
        <AvatarFallback>IU</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="Broken image" src="https://invalid-url/avatar.png" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </div>
  );
}
