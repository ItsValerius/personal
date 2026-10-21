import React from "react";
import {
  Cloud,
  FileCode2,
  FlaskConical,
  Languages,
  type LucideIcon,
  Rocket,
  TestTubeDiagonal,
  Webhook,
} from "lucide-react";
import {
  type SimpleIcon,
  siBitbucket,
  siCss,
  siDocker,
  siDrizzle,
  siFilament,
  siGit,
  siGithubactions,
  siJavascript,
  siJquery,
  siLaravel,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siRedis,
  siSass,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVitest,
  siVuedotjs,
} from "simple-icons";

// brand marks from simple-icons; skills without one get a fitting lucide icon
const brands: Record<string, SimpleIcon> = {
  Laravel: siLaravel,
  Filament: siFilament,
  PHP: siPhp,
  "Node.js": siNodedotjs,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
  "Drizzle ORM": siDrizzle,
  Redis: siRedis,
  Vue: siVuedotjs,
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Next.js": siNextdotjs,
  jQuery: siJquery,
  "Tailwind CSS": siTailwindcss,
  CSS: siCss,
  SCSS: siSass,
  Vitest: siVitest,
  Git: siGit,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  "Bitbucket Pipelines": siBitbucket,
  Vercel: siVercel,
};

const generic: Record<string, LucideIcon> = {
  "REST-APIs": Webhook,
  Blade: FileCode2,
  PHPUnit: FlaskConical,
  Pest: TestTubeDiagonal,
  Envoyer: Rocket,
  AWS: Cloud,
};

const SkillIcon = ({ name, group, className }: { name: string; group: string; className?: string }) => {
  const brand = brands[name];
  if (brand)
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d={brand.path} />
      </svg>
    );
  const Icon = generic[name] ?? (group === "languages" ? Languages : null);
  return Icon ? <Icon aria-hidden="true" className={className} /> : null;
};

export default SkillIcon;
