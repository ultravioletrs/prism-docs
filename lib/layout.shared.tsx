import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";
import { assetPath } from "@/lib/base-path";

// fill this with your actual GitHub info, for example:
export const gitConfig = {
  user: "ultravioletrs",
  repo: "prism-docs",
  branch: "main",
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <Image
          src={assetPath("/img/Prism_logo.png")}
          alt="Prism AI"
          width={144}
          height={48}
          className="h-10 w-auto invert dark:invert-0"
        />
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
