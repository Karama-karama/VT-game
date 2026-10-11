// components/home/intro-card.tsx
import { Diamond, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { Tag } from "./Tag";
import { Button } from "./Button";


interface IntroCardProps {
  onPlay: () => void; // Vue's emit("play") becomes a function prop
}

export function IntroCard({ onPlay }: IntroCardProps) {
  const t = useTranslations("IntroCard");

  return (
    <section className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
      <Tag tone="neutral" size="sm" upperCase icon={<Diamond />}>
       <span className="lg:hidden">{t("tag")}</span>
      </Tag>

      <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground lg:text-6xl">
        {t.rich("title", {
          accent: (chunks) => <span className="text-primary">{chunks}</span>,
        })}
      </h1>

      <p className="max-w-md text-base text-muted">{t("description")}</p>

      <div className="flex w-full flex-col items-center gap-2 md:items-start md:flex-row">
        <Button
          label={t("play")}
          icon={<Play />}
          onClick={onPlay}
          className="w-full md:w-auto md:px-8"
        />
        <p className="text-xs text-muted">{t("duration")}</p>
      </div>
    </section>
  );
}