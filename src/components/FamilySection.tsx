import { useLanguage } from '@/context/LanguageContext';
import { Heart } from 'lucide-react';

interface FamilyMember {
  name: string;
  relation: string;
  image?: string;
  message?: string;
}

const brideFamily: FamilyMember[] = [
  { name: 'Dr. Bhaskar Shenolikar', relation: 'Father of the Bride', message: 'Wishing you eternal happiness!' },
  { name: 'Dr. Dhanashree Shenolikar', relation: 'Mother of the Bride', message: 'May your love grow stronger each day.' },
  { name: 'Dr Pranjal Shenolikar', relation: 'Sister', message: 'Congratulations to my cooler sister!' },
  { name: 'Mrs. Meera Parasnis', relation: 'Grandmother', message: 'Blessings for a beautiful life together.' },
];

const groomFamily: FamilyMember[] = [
  { name: 'Mr. Pandurang Patil', relation: 'Father of the Groom', message: 'Proud of you, son!' },
  { name: 'Mrs. Vandana Patil', relation: 'Mother of the Groom', message: 'Welcoming our new daughter!' },
  { name: 'Mrs Surabhi Patil Yargattikar', relation: 'Sister', message: 'So happy for you both!' },
];

export function FamilySection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-background mandala-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            {t('family.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bride's Family */}
          <div>
            <h3 className="font-display text-2xl text-secondary text-center mb-8">
              {t('family.brideFamily')}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {brideFamily.map((member, index) => (
                <FamilyCard key={index} member={member} />
              ))}
            </div>
          </div>

          {/* Groom's Family */}
          <div>
            <h3 className="font-display text-2xl text-secondary text-center mb-8">
              {t('family.groomFamily')}
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {groomFamily.map((member, index) => (
                <FamilyCard key={index} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FamilyCard({ member }: { member: FamilyMember }) {
  return (
    <div className="bg-card rounded-xl p-6 text-center shadow-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      {/* Avatar */}
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/30">
        <span className="font-display text-2xl text-primary">
          {member.name.charAt(0)}
        </span>
      </div>

      {/* Name & Relation */}
      <h4 className="font-display text-lg text-foreground mb-1">{member.name}</h4>
      <p className="text-sm text-primary mb-3">{member.relation}</p>

      {/* Message */}
      {member.message && (
        <p className="text-sm text-muted-foreground italic">"{member.message}"</p>
      )}
    </div>
  );
}
