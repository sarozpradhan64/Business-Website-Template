import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
    ArchiveBoxXMarkIcon,
    ChevronDownIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";

export default function NavDropDown() {
    return (
        <div>
            <Menu>
                <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white">
                    Username
                    <ChevronDownIcon className="size-4 fill-white/60" />
                </MenuButton>

                <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-52 origin-top-right rounded-xl bg-secondary p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem>
                        <Link 
                         method="post"
                         href={route("logout")}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <ArrowRightStartOnRectangleIcon className="size-4 fill-white/30" />
                            Log out
                        </Link>
                    </MenuItem>
                </MenuItems>
            </Menu>
        </div>
    );
}
