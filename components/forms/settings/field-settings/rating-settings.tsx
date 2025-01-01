'use client';

import { FormField } from '@/types/form';
import { SettingsSection } from './settings-section';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Toggle } from './toggle';

interface RatingSettingsProps {
  field: FormField;
  onFieldUpdate: (field: FormField) => void;
}

export function RatingSettings({ field, onFieldUpdate }: RatingSettingsProps) {
  if (field.type !== 'star-rating' && field.type !== 'number-rating')
    return null;

  const isStarRating = field.type === 'star-rating';

  return (
    <>
      <SettingsSection title="Validation">
        <Toggle
          label="Required field"
          description="Make this field mandatory"
          checked={field.validation?.required || false}
          onCheckedChange={(checked) =>
            onFieldUpdate({
              ...field,
              validation: {
                ...field.validation,
                required: checked,
              },
            })
          }
        />
      </SettingsSection>

      <SettingsSection title="Rating settings">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="font-normal">
              Maximum {isStarRating ? 'Stars' : 'Rating'}
            </Label>
            <Input
              type="number"
              min="1"
              max={isStarRating ? '10' : '100'}
              value={
                field.settings?.[isStarRating ? 'maxStars' : 'maxRating'] ||
                (isStarRating ? '5' : '10')
              }
              onChange={(e) =>
                onFieldUpdate({
                  ...field,
                  settings: {
                    ...field.settings,
                    [isStarRating ? 'maxStars' : 'maxRating']: Number(
                      e.target.value
                    ),
                  },
                })
              }
            />
          </div>

          {isStarRating && (
            <Toggle
              label="Allow half stars"
              description="Enable rating with half stars"
              checked={field.settings?.allowHalfStars || false}
              onCheckedChange={(checked) =>
                onFieldUpdate({
                  ...field,
                  settings: {
                    ...field.settings,
                    allowHalfStars: checked,
                  },
                })
              }
            />
          )}

          {!isStarRating && (
            <Toggle
              label="Show Values"
              description="Display numeric values below rating buttons"
              checked={field.settings?.showValues || false}
              onCheckedChange={(checked) =>
                onFieldUpdate({
                  ...field,
                  settings: {
                    ...field.settings,
                    showValues: checked,
                  },
                })
              }
            />
          )}
        </div>
      </SettingsSection>
    </>
  );
}
