import { useTranslation } from "react-i18next";
import { SettingsRow } from "@/components/settings/settings-row";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  isVisualEffectsLevel,
  VISUAL_EFFECTS_LEVELS,
  type VisualEffectsLevel,
} from "@/lib/visual-effects";
import { useUserPreferencesStore } from "@/store/user-preferences";

export function VisualEffectsRow() {
  const { t } = useTranslation();
  const visualEffects = useUserPreferencesStore((state) => state.visualEffects);
  const setVisualEffects = useUserPreferencesStore(
    (state) => state.setVisualEffects,
  );
  const labels: Record<VisualEffectsLevel, string> = {
    full: t("settings:preferencesPage.visualEffectsFull"),
    reduced: t("settings:preferencesPage.visualEffectsReduced"),
    off: t("settings:preferencesPage.visualEffectsOff"),
  };

  return (
    <SettingsRow
      stack
      title={t("settings:preferencesPage.visualEffects")}
      description={t("settings:preferencesPage.visualEffectsDescription")}
    >
      <Select
        value={visualEffects}
        onValueChange={(value) => {
          if (isVisualEffectsLevel(value)) setVisualEffects(value);
        }}
      >
        <SelectTrigger
          size="sm"
          className="sm:w-48"
          aria-label={t("settings:preferencesPage.visualEffects")}
        >
          <SelectValue
            placeholder={t("settings:preferencesPage.selectVisualEffects")}
          >
            {labels[visualEffects]}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {VISUAL_EFFECTS_LEVELS.map((level) => (
            <SelectItem key={level} value={level}>
              {labels[level]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsRow>
  );
}
