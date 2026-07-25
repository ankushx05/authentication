import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/button";
import { Text } from "@repo/ui/text";
import { EmailTemplate  } from "#/gen/admin/mail_template/v1/mail_template_pb";
import type {MailTemplate} from "#/gen/admin/mail_template/v1/mail_template_pb";
import { Code, Edit, Mail, Trash2 } from "lucide-react";

interface Props {
  templates: MailTemplate[];
  onEdit: (template: MailTemplate) => void;
  onDelete: (template: MailTemplate) => void;
}

export const MailTemplateList = ({ templates, onEdit, onDelete }: Props) => {
  if (templates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed border-border rounded-2xl gap-3 text-center">
        <div className="p-4 bg-primary/10 rounded-full text-primary">
          <Mail size={32} />
        </div>
        <Text variant="h6" className="font-semibold">
          No Mail Templates Found
        </Text>
        <Text variant="paragraph2" className="text-foreground-secondary max-w-sm">
          Click "Add Template" above to create your first email template with dynamic variables.
        </Text>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {templates.map((t) => (
        <Card key={t.id} className="p-5 border border-border bg-card hover:border-border/80 transition-colors">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Text variant="h6" className="font-bold">
                    {t.name}
                  </Text>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary-soft-hover">
                    {EmailTemplate[t.uniqueKey]}
                  </span>
                </div>
                <Text variant="paragraph2" className="text-sm text-foreground-secondary mt-1">
                  Subject: <span className="text-foreground font-medium">{t.subject}</span>
                </Text>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  color="secondary"
                  className="p-2 h-auto"
                  onClick={() => onEdit(t)}
                  title="Edit Template"
                >
                  <Edit size={16} />
                </Button>
                <Button
                  className="p-2 h-auto text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                  color="secondary"
                  onClick={() => onDelete(t)}
                  title="Delete Template"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            {/* Body Preview */}
            <div className="p-3 bg-background-secondary rounded-lg font-mono text-xs text-foreground-secondary max-h-24 overflow-y-auto whitespace-pre-wrap">
              {t.body}
            </div>

            {/* Variables */}
            {t.variables.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-foreground-muted font-medium flex items-center gap-1">
                  <Code size={12} />
                  Variables:
                </span>
                {t.variables.map((v) => (
                  <span
                    key={v}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-background border border-border text-foreground-secondary"
                  >
                    {"{{" + v + "}}"}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
