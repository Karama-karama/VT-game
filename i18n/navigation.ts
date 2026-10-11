import { createNavigation } from "next-intl/navigation";
import { routing } from "./routings";

export const { Link, useRouter, redirect, usePathname } = createNavigation(routing);