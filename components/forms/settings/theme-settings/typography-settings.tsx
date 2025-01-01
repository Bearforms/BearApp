'use client';

import { Label } from '@/components/ui/label';
import { GOOGLE_FONTS } from '@/lib/constants/fonts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SettingsSection } from '../field-settings/settings-section';
import { useGoogleFonts } from '@/hooks/use-google-fonts';

interface TypographySettingsProps {
  headingFont: string;
  bodyFont: string;
  onHeadingFontChange: (font: string) => void;
  onBodyFontChange: (font: string) => void;
}

export function TypographySettings({
  headingFont,
  bodyFont,
  onHeadingFontChange,
  onBodyFontChange,
}: TypographySettingsProps) {
  // Load selected fonts
  useGoogleFonts(headingFont, bodyFont);

  return (
    <SettingsSection title="Typography">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="space-y-0.5">
            <Label className="font-normal">Heading font</Label>
            <p className="text-sm text-muted-foreground">
              Used for form titles and section headings
            </p>
          </div>
          <Select value={headingFont} onValueChange={onHeadingFontChange}>
            <SelectTrigger>
              <SelectValue>
                <span style={{ fontFamily: headingFont }}>
                  {GOOGLE_FONTS.find((f) => f.value === headingFont)?.name || headingFont}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Sans Serif
                </SelectLabel>
                {GOOGLE_FONTS.filter(f => f.category === 'sans-serif').map((font) => (
                  <SelectItem
                    key={font.id}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Serif
                </SelectLabel>
                {GOOGLE_FONTS.filter(f => f.category === 'serif').map((font) => (
                  <SelectItem
                    key={font.id}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Monospace
                </SelectLabel>
                {GOOGLE_FONTS.filter(f => f.category === 'monospace').map((font) => (
                  <SelectItem
                    key={font.id}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="space-y-0.5">
            <Label className="font-normal">Body font</Label>
            <p className="text-sm text-muted-foreground">
              Used for form fields and general text
            </p>
          </div>
          <Select value={bodyFont} onValueChange={onBodyFontChange}>
            <SelectTrigger>
              <SelectValue>
                <span style={{ fontFamily: bodyFont }}>
                  {GOOGLE_FONTS.find((f) => f.value === bodyFont)?.name || bodyFont}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Sans Serif
                </SelectLabel>
                {GOOGLE_FONTS.filter(f => f.category === 'sans-serif').map((font) => (
                  <SelectItem
                    key={font.id}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Serif
                </SelectLabel>
                {GOOGLE_FONTS.filter(f => f.category === 'serif').map((font) => (
                  <SelectItem
                    key={font.id}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-xs text-muted-foreground">
                  Monospace
                </SelectLabel>
                {GOOGLE_FONTS.filter(f => f.category === 'monospace').map((font) => (
                  <SelectItem
                    key={font.id}
                    value={font.value}
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </SettingsSection>
  );
}