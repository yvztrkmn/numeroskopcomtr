import type { AnalysisPoint, SeoSection, CareerPitfall } from '../types';
// This is needed by getLoveCompatibility, importing from utils would create a circular dependency
import * as numerology from '../utils/numerology';

// Simplified Interpretation data
const interpretations: { [key: number]: { title: string; description: string } } = {
  1: { title: 'Lider', description: 'Bağımsızlık, öncülük ve yenilik sizin doğanızda var. Doğuştan bir lidersiniz ve kendi yolunuzu çizme konusunda doğal bir yeteneğe sahipsiniz. Yeni başlangıçlar yapmaktan ve sorumluluk almaktan çekinmezsiniz. Enerjiniz, kararlılık ve güçlü bir irade ile hedeflerinize ulaşmanızı sağlar.' },
  2: { title: 'Diplomat', description: 'İşbirliği, denge ve uyum sizin için anahtar kelimeler. Duyarlı, anlayışlı ve sabırlı yapınızla insanlar arasında köprüler kurarsınız. Ortaklıklar ve takım çalışması sizin için doğal bir alandır ve barışı koruma konusunda ustasınızdır.' },
  3: { title: 'İletişimci', description: 'Yaratıcılık, kendini ifade etme ve sosyal bir enerjiyle dolusunuz. İletişim yetenekleriniz güçlü, sanatsal yönünüz gelişmiştir. Hayata neşeli ve iyimser bir pencereden bakarsınız, bu da çevrenize ilham verir.' },
  4: { title: 'Mimar', description: 'Disiplin, düzen ve istikrar sizin temel taşlarınızdır. Pratik, güvenilir ve sorumluluk sahibisiniz. Sağlam temeller atmak ve hedeflerinize planlı bir şekilde ulaşmak sizin için önemlidir. Sıkı çalışma sizi asla korkutmaz.' },
  5: { title: 'Maceracı', description: 'Özgürlük, değişim ve macera ruhunuzu besler. Rutinden hoşlanmaz, yeni deneyimlere ve heyecan verici fırsatlara her zaman açıksınız. Uyum sağlama yeteneğiniz yüksek ve hayatın sunduğu çeşitliliği kucaklarsınız.' },
  6: { title: 'Koruyucu', description: 'Sorumluluk, sevgi ve hizmet etme arzusuyla hareket edersiniz. Aile, ev ve topluluk sizin için büyük önem taşır. Şefkatli, adil ve yardımsever yapınızla çevrenizdekiler için bir sığınak olursunuz.' },
  7: { title: 'Mistik', description: 'İçsel bilgelik, analiz ve maneviyat yolunuzu aydınlatır. Hayatın derin anlamlarını araştıran, sezgileri güçlü ve analitik bir zihne sahipsiniz. Yalnız kalıp düşünmek ve gizemleri çözmek sizi besler.' },
  8: { title: 'Güç Sahibi', description: 'Başarı, güç ve materyal dünya sizin oyun alanınızdır. Hırslı, kararlı ve doğal bir yönetme yeteneğine sahipsiniz. Büyük hedefler belirler ve onlara ulaşmak için gereken otoriteyi ve stratejiyi kullanırsınız.' },
  9: { title: 'Hümanist', description: 'Evrensel sevgi, fedakarlık ve bilgelik sizin özünüzdür. İnsanlığa hizmet etme ve dünyayı daha iyi bir yer yapma arzusu taşırsınız. Anlayışlı, cömert ve idealist bir yapıya sahiptir.' },
  11: { title: 'Aydınlatıcı', description: 'Usta bir sayı olan 11, yüksek sezgi, maneviyat ve idealizmi temsil eder. Normalin ötesinde bir farkındalığa sahipsiniz ve başkalarına ilham verme, yol gösterme potansiyeliniz çok yüksektir. 2\'nin diplomatik özelliklerini daha yüksek bir seviyede taşırsınız.' },
  22: { title: 'Usta Mimar', description: 'En güçlü usta sayılardan biri olan 22, büyük hayalleri somut gerçekliğe dönüştürme gücüne sahiptir. Vizyoner düşünceyi, 4\'ün pratikliği ve disipliniyle birleştirirsiniz. İnsanlık için kalıcı ve önemli eserler bırakma potansiyeliniz vardır.' },
  33: { title: 'Usta Öğretmen', description: 'Usta sayı 33, şefkat, hizmet ve evrensel sevginin en yüksek ifadesidir. Başkalarını iyileştirme, onlara yol gösterme ve koşulsuz sevgiyle öğretme potansiyeli taşırsınız. 6\'nın koruyucu enerjisini evrensel bir boyuta taşırsınız.' },
};

export const lifePathInterpretations = interpretations;
export const destinyNumberInterpretations = interpretations;
export const soulUrgeNumberInterpretations = interpretations;
export const personalityNumberInterpretations = interpretations;

// Simplified Personal Report Points
export const personalReportPoints: { [key: number]: { points: AnalysisPoint[] } } = {};
for (let i = 1; i <= 33; i++) {
  if (!interpretations[i]) continue;
  personalReportPoints[i] = {
    points: [
      { icon: 'military_tech', title: `Güçlü Yön: ${interpretations[i].title}`, description: 'Bu sizin en belirgin ve doğal yeteneğinizdir.' },
      { icon: 'menu_book', title: 'Yaşam Dersi', description: 'Hayatınız boyunca öğrenmeniz gereken temel ders budur.' },
      { icon: 'favorite', title: 'Motivasyon', description: 'Sizi en çok motive eden içsel dürtüler bunlardır.' },
      { icon: 'psychology', title: 'Gelişim Alanı', description: 'Bu alana odaklanmak kişisel büyümenizi hızlandıracaktır.' },
    ]
  };
}

// Love Compatibility
export const getLoveCompatibility = (num1: number, num2: number) => {
  const diff = Math.abs(numerology.reduceNumber(num1, true) - numerology.reduceNumber(num2, true));
  let score = 100 - diff * 10;
  if (score < 30) score = 30;
  if ((num1 % 2 === num2 % 2)) score += 10; // same parity bonus
  if (score > 100) score = 100;
  
  return {
    score: Math.round(score),
    title: 'Dinamik Bir Etkileşim',
    points: [
      { icon: 'thumb_up', title: 'Güçlü Yönleriniz', description: 'Birbirinizi tamamlayan harika özelliklere sahipsiniz.' },
      { icon: 'visibility', title: 'Dikkat Edilmesi Gerekenler', description: 'İletişimde açık olmak ilişkinizi güçlendirecektir.' },
      { icon: 'spa', title: 'İlişki Potansiyeli', description: 'Birlikte büyümek için büyük bir potansiyeliniz var.' },
    ]
  };
};

export const getCompatibilityImpact = (type: string, num1: number, num2: number): string => {
  return `Sizin ${num1} enerjiniz, partnerinizin ${num2} enerjisiyle etkileşime girerek ilişkinize dinamizm katıyor.`;
};

// Personal Year Data
export const personalYearInterpretations: { [key: number]: { theme: string, points: AnalysisPoint[] } } = {};
for (let i = 1; i <= 9; i++) {
  personalYearInterpretations[i] = {
    theme: `${interpretations[i].title} Yılı`,
    points: [
      { icon: 'flag', title: 'Ana Odak', description: 'Bu yıl enerjinizi bu alana yönlendirmek size başarı getirecek.' },
      { icon: 'trending_up', title: 'Fırsatlar', description: 'Karşınıza bu alanlarda heyecan verici fırsatlar çıkabilir.' },
      { icon: 'shield', title: 'Zorluklar', description: 'Bu konularda dikkatli olmak ve sabırlı davranmak önemlidir.' },
      { icon: 'key', title: 'Yılın Anahtarı', description: 'Bu yılın potansiyelini en üst düzeye çıkarmak için bu ilkeyi benimseyin.' },
    ]
  };
}

// Career Data
export const careerInterpretations: { [key: number]: { points: AnalysisPoint[], pitfalls: CareerPitfall[] } } = {};
for (let i = 1; i <= 33; i++) {
    if (!interpretations[i]) continue;
    careerInterpretations[i] = {
        points: [
            { icon: 'insights', title: 'Doğal Yetenekler', description: `Liderlik, yaratıcılık ve problem çözme gibi alanlarda ${i} enerjisi sizi destekler.` },
            { icon: 'work', title: 'İdeal Kariyer Alanları', description: 'Teknoloji, sanat, eğitim veya yönetim gibi alanlar sizin için uygun olabilir.' },
            { icon: 'psychology', title: 'Çalışma Tarzı', description: 'Bağımsız çalışmayı veya bir ekibin parçası olmayı tercih edebilirsiniz.' },
            { icon: 'payments', title: 'Finansal Potansiyel', description: 'Finansal başarı için potansiyeliniz yüksek, ancak planlı olmalısınız.' },
        ],
        pitfalls: [
            {
                icon: 'warning',
                engagingTitle: 'Potansiyel Tuzak: Mükemmeliyetçilik',
                detailedDescription: 'Her şeyin kusursuz olması için aşırı çaba göstermek, ilerlemenizi yavaşlatabilir ve strese neden olabilir.',
                actionableAdvice: ['"Yeterince iyi" kavramını benimseyin.', 'Görevleri delege etmekten çekinmeyin.', 'Sürece odaklanın, sadece sonuca değil.']
            }
        ]
    };
}

const interactionInsights: { [key: string]: { [key: number]: (lp: number) => string } } = {
    destiny: {
        1: (lp) => `Kaderinizdeki bu 'Lider' enerjisi, ${lp} Yaşam Yolu'nuzun doğal dürtüleriyle birleşerek sizi durdurulamaz bir güç haline getirir. Vizyonunuzu hayata geçirmek için gereken tüm araçlara sahipsiniz.`,
        4: (lp) => `Kaderinizdeki 'Mimar' titizliği, ${lp} Yaşam Yolu'nuzun enerjisini somut projelere dönüştürmenize yardımcı olur. Fikirlerinizi gerçeğe dönüştürme konusunda doğal bir yeteneğiniz var.`,
        9: (lp) => `Kaderinizdeki 'Hümanist' bakış açısı, ${lp} Yaşam Yolu'nuzun hedeflerine evrensel bir anlam katar. Başarılarınız sadece size değil, daha geniş bir topluluğa da hizmet etme potansiyeli taşır.`
    },
    soulUrge: {
        2: (lp) => `Ruhunuzun aradığı denge ve uyum, ${lp} Yaşam Yolu'nuzun maceracı ruhunu topraklayarak ilişkilerinizde derinlik ve anlam bulmanıza yardımcı olur.`,
        5: (lp) => `Ruhunuzun özgürlük ve macera arzusu, ${lp} Yaşam Yolu'nuzun enerjisini sürekli olarak yeni ufuklara taşır. Değişimden korkmaz, aksine ondan beslenirsiniz.`,
        7: (lp) => `Ruhunuzun derin anlama ve bilgelik arayışı, ${lp} Yaşam Yolu'nuzun hedeflerine felsefi bir boyut ekler. Yaptığınız her işte bir anlam ararsınız.`
    },
    personality: {
        3: (lp) => `Dış dünyaya yansıttığınız 'İletişimci' ve neşeli tavır, ${lp} Yaşam Yolu'nuzun hedeflerine ulaşırken sosyal kapıları kolayca açmanızı sağlar. İnsanlar enerjinize çekilir.`,
        6: (lp) => `Çevrenize gösterdiğiniz 'Koruyucu' ve sorumluluk sahibi tavır, ${lp} Yaşam Yolu'nuzda ilerlerken size güvenilir müttefikler kazandırır. İnsanlar size güvenir.`,
        8: (lp) => `Dışarıdan görünen 'Güç Sahibi' ve yetkin duruşunuz, ${lp} Yaşam Yolu'nuzun liderlik potansiyelini destekler ve hedeflerinize ulaşmanız için gereken saygıyı görmenizi sağlar.`
    }
};

export const getInteractionText = (type: 'destiny' | 'soulUrge' | 'personality', num: number, lifePath: number): string => {
    const reducedNum = numerology.reduceNumber(num, true);
    const insightFunction = interactionInsights[type]?.[reducedNum];

    if (insightFunction) {
        return insightFunction(lifePath);
    }
    
    // Fallback for numbers not explicitly defined in interactionInsights
    const typeTR = type === 'destiny' ? 'Kader' : type === 'soulUrge' ? 'Ruh Dürtüsü' : 'Kişilik';
    return `${typeTR} sayınız olan ${num}, Yaşam Yolu sayınız olan ${lifePath} ile birleştiğinde, hayatınıza özel bir dinamik katıyor. Bu iki enerji, hedeflerinize ulaşmanızda size rehberlik eder.`;
};


export const getBreakdownInfluence = (number: number, type: string): string => {
    return `${type}, ${number} sayısının enerjisiyle bu yılki yolculuğunuza yön veriyor.`;
};

export const getBreakdownInteraction = (number: number, lifePath: number): string => {
    return `Bu enerji, Yaşam Yolu sayınız olan ${lifePath} ile etkileşime girerek, kişisel gelişiminiz için yeni kapılar açıyor.`;
};


// SEO Content
const createSeoContent = (title: string): SeoSection => ({
  title: `${title} Numerolojisi Hakkında Daha Fazla Bilgi`,
  sections: [
    { heading: `Numerolojide ${title}`, paragraph: `${title} analizi, sayıların hayatımızdaki derin etkilerini anlamak için güçlü bir araçtır. Bu, sadece bir sayıdan daha fazlasıdır.` },
    { heading: 'Sayıların Anlamı', paragraph: 'Her sayının kendine özgü bir titreşimi ve anlamı vardır. Bu anlamları keşfetmek, kişisel farkındalığı artırır.' },
  ]
});

export const seoContent = {
  love: createSeoContent('Aşk Uyumu'),
  personal: createSeoContent('Kişisel Rapor'),
  year: createSeoContent('Kişisel Yıl'),
  career: createSeoContent('Kariyer Potansiyeli'),
};