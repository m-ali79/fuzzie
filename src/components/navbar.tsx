import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-black h-[10vh] px-4 py-10 text-white border-b border-gray-200 flex flex-col justify-center">
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <h3 className="flex gap-0 items-center font-bold text-3xl">
          Fu
          <Image
            src="/fuzzieLogo.png"
            alt="fuzzie logo"
            className="shadow-sm"
            width={13}
            height={13}
          />
          zie
        </h3>

        <div className="items-center gap-x-6 hidden md:flex list-none  justify-center">
          <li>
            <Link href={"#"}>Products</Link>
          </li>
          <li>
            <Link href={"#"}>Docs</Link>{" "}
          </li>

          <li>
            <Link href={"#"}>Pricing</Link>
          </li>
          <li>
            <Link href={"#"}>Resources</Link>
          </li>
          <li>
            <Link href={"#"}>Links</Link>
          </li>
          <li>
            <Link href={"#"}>Enterprise</Link>
          </li>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={"/dashboard"}
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Dashboard
            </span>
          </Link>
          {/* user Profile Button if loggedIn */}
          <MenuIcon className="md:hidden" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
