import { FileText, Briefcase, GraduationCap, Scale, Heart, Code, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  settings: {
    length: number;
    tone: string;
    focus: string;
  };
}

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void;
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const templates: Template[] = [
    {
      id: 'business',
      name: 'Business Report',
      description: 'Financial reports, quarterly reviews, business plans',
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      settings: { length: 30, tone: 'formal', focus: 'key-metrics' }
    },
    {
      id: 'academic',
      name: 'Academic Paper',
      description: 'Research papers, theses, academic articles',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      settings: { length: 40, tone: 'formal', focus: 'methodology' }
    },
    {
      id: 'legal',
      name: 'Legal Document',
      description: 'Contracts, agreements, legal briefs',
      icon: Scale,
      color: 'from-gray-600 to-gray-700',
      settings: { length: 50, tone: 'formal', focus: 'obligations' }
    },
    {
      id: 'medical',
      name: 'Medical Report',
      description: 'Clinical studies, medical research, health reports',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      settings: { length: 35, tone: 'formal', focus: 'findings' }
    },
    {
      id: 'technical',
      name: 'Technical Doc',
      description: 'API docs, technical specs, architecture documents',
      icon: Code,
      color: 'from-green-500 to-green-600',
      settings: { length: 40, tone: 'simple', focus: 'implementation' }
    },
    {
      id: 'executive',
      name: 'Executive Brief',
      description: 'C-level summaries, board presentations, strategic docs',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      settings: { length: 20, tone: 'bullets', focus: 'action-items' }
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="font-semibold">Quick Templates</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Pre-configured settings optimized for different document types
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template, index) => {
          const Icon = template.icon;
          return (
            <motion.button
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectTemplate(template)}
              className="p-4 rounded-xl border border-border hover:border-purple-300 hover:bg-purple-50/50 transition-all text-left group"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium mb-1 group-hover:text-purple-600 transition-colors">
                    {template.name}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-xs">
                  {template.settings.length}% length
                </span>
                <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs capitalize">
                  {template.settings.tone}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Pro Tip:</strong> Templates automatically adjust summary length, tone, and focus areas 
          based on document type. You can still customize after selection.
        </p>
      </div>
    </div>
  );
}
