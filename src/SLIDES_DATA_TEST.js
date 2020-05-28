// Simule l'envoi de plusieurs slides

import img1 from "./assets/images/slide-test/img1.png";
import img2 from "./assets/images/slide-test/img2.png";
import img3 from "./assets/images/slide-test/img3.png";
import img4 from "./assets/images/slide-test/img4.png";
import img5 from "./assets/images/slide-test/img5.png";
import img6 from "./assets/images/slide-test/img6.png";
import img7 from "./assets/images/slide-test/img7.png";
import img8 from "./assets/images/slide-test/img8.png";
import img9 from "./assets/images/slide-test/img9.png";

import imga from "./assets/images/slide-test-2/imga.png";
import imgb from "./assets/images/slide-test-2/imgb.png";
import imgc from "./assets/images/slide-test-2/imgc.png";
import imgd from "./assets/images/slide-test-2/imgd.png";
import imge from "./assets/images/slide-test-2/imge.png";
import imgf from "./assets/images/slide-test-2/imgf.png";
import imgg from "./assets/images/slide-test-2/imgg.png";

import aa from "./assets/images/slide-test-3/aa.png";
import bb from "./assets/images/slide-test-3/bb.png";
import cc from "./assets/images/slide-test-3/cc.png";
import dd from "./assets/images/slide-test-3/dd.png";
import ee from "./assets/images/slide-test-3/ee.png";
import ff from "./assets/images/slide-test-3/ff.png";
import gg from "./assets/images/slide-test-3/gg.png";
import hh from "./assets/images/slide-test-3/hh.png";

const SLIDES_DATA_TEST =
  [
    {
      id: 1,
      created_at: 1590653037626,
      title: "Icones gratuites avec ionicons blablajfefpf jddp odpd",
      author: "Pierre",
      category: "design",
      langage: 'autre',
      tags: [
        "logo",
        "icones",
        "gratuit",
        "ionicons"
      ],
      slides: [img1, img2, img3, img4, img5, img6, img7, img8, img9],
      description: "Ceci est la description du slide numéro 1 ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam perspiciatis ut doloribus necessitatibus sunt, provident id dolorem temporibus officiis, sapiente nostrum excepturi! Deleniti minima amet ducimus in. Sed deserunt quo laborum culpa fuga quia quam eaque beatae. Perspiciatis, assumenda laudantium quasi alias repellat accusamus vero earum ratione at nisi quisquam ab autem beatae maxime quam commodi id numquam. Eligendi tenetur labore cumque quae, dolore animi nihil dolorem delectus neque odio iste sint nobis quam laboriosam porro, repellat pariatur? Tempore vitae explicabo saepe dolorem sapiente, eligendi numquam accusamus, iure nisi et earum ut veniam ipsam minus officia. Quaerat, incidunt. Aliquid reprehenderit, hic animi exercitationem non officia quisquam provident vitae quaerat facere? Nam voluptate quod deserunt esse ullam. Necessitatibus cupiditate perferendis quod, fugit magnam culpa assumenda illo delectus sapiente officia et facilis. Perferendis, officia magni nihil eaque iure asperiores pariatur inventore rem, tenetur illo nemo ea minus neque cumque, consequatur quod. Ipsum minus itaque quod dolores quisquam quam aliquam dolorum! Reprehenderit quasi in excepturi vero! Doloremque ipsum hic voluptatibus est. Placeat deserunt et quae eveniet molestiae consequuntur nihil officia facilis quam in? Velit aperiam officiis repudiandae? Aliquid dolores, delectus fugit amet explicabo obcaecati? Perspiciatis tempora quisquam nulla, ipsa itaque beatae vitae asperiores? Assumenda, quo mollitia. Commodi id quo molestias, tempora dolor illo ipsam voluptates omnis repellat laboriosam. Blanditiis earum exercitationem fugit perferendis esse vitae, aliquam alias ducimus porro est minima assumenda optio velit iusto molestias nostrum dolores id. "
    },
    {
      id: 2,
      created_at: 1590653037626,
      title: "Top 5 des banques d'images gratuites",
      author: "Jean-eudes de la place",
      category: "design",
      langage: 'autre',
      tags: [
        "images",
        "banque",
        "gratuit",
        "ressource"
      ],
      slides: [imga, imgb, imgc, imgd, imge, imgf, imgg],
      description: "Ceci est la description du slide numéro 1 ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam perspiciatis ut doloribus necessitatibus sunt, provident id dolorem temporibus officiis, sapiente nostrum excepturi! Deleniti minima amet ducimus in. Sed deserunt quo laborum culpa fuga quia quam eaque beatae. Perspiciatis, assumenda laudantium quasi alias repellat accusamus vero earum ratione at nisi quisquam ab autem beatae maxime quam commodi id numquam. Eligendi tenetur labore cumque quae, dolore animi nihil dolorem delectus neque odio iste sint nobis quam laboriosam porro, repellat pariatur? Tempore vitae explicabo saepe dolorem sapiente, eligendi numquam accusamus, iure nisi et earum ut veniam ipsam minus officia. Quaerat, incidunt. Aliquid reprehenderit, hic animi exercitationem non officia quisquam provident vitae quaerat facere? Nam voluptate quod deserunt esse ullam. Necessitatibus cupiditate perferendis quod, fugit magnam culpa assumenda illo delectus sapiente officia et facilis. Perferendis, officia magni nihil eaque iure asperiores pariatur inventore rem, tenetur illo nemo ea minus neque cumque, consequatur quod. Ipsum minus itaque quod dolores quisquam quam aliquam dolorum! Reprehenderit quasi in excepturi vero! Doloremque ipsum hic voluptatibus est. Placeat deserunt et quae eveniet molestiae consequuntur nihil officia facilis quam in? Velit aperiam officiis repudiandae? Aliquid dolores, delectus fugit amet explicabo obcaecati? Perspiciatis tempora quisquam nulla, ipsa itaque beatae vitae asperiores? Assumenda, quo mollitia. Commodi id quo molestias, tempora dolor illo ipsam voluptates omnis repellat laboriosam. Blanditiis earum exercitationem fugit perferendis esse vitae, aliquam alias ducimus porro est minima assumenda optio velit iusto molestias nostrum dolores id. "
    },
    {
      id: 1,
      created_at: 1590653037626,
      title: "Les objets Javascript",
      author: "Marc",
      category: "theorie",
      langage: 'javascript',
      tags: [
        "javascript",
        "objet",
        "code",
        "oop"
      ],
      slides: [aa, bb, cc, dd, ee, ff, gg, hh],
      description: "Ceci est la description du slide numéro 3 ! Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam perspiciatis ut doloribus necessitatibus sunt, provident id dolorem temporibus officiis, sapiente nostrum excepturi! Deleniti minima amet ducimus in. Sed deserunt quo laborum culpa fuga quia quam eaque beatae. Perspiciatis, assumenda laudantium quasi alias repellat accusamus vero earum ratione at nisi quisquam ab autem beatae maxime quam commodi id numquam. Eligendi tenetur labore cumque quae, dolore animi nihil dolorem delectus neque odio iste sint nobis quam laboriosam porro, repellat pariatur? Tempore vitae explicabo saepe dolorem sapiente, eligendi numquam accusamus, iure nisi et earum ut veniam ipsam minus officia. Quaerat, incidunt. Aliquid reprehenderit, hic animi exercitationem non officia quisquam provident vitae quaerat facere? Nam voluptate quod deserunt esse ullam. Necessitatibus cupiditate perferendis quod, fugit magnam culpa assumenda illo delectus sapiente officia et facilis. Perferendis, officia magni nihil eaque iure asperiores pariatur inventore rem, tenetur illo nemo ea minus neque cumque, consequatur quod. Ipsum minus itaque quod dolores quisquam quam aliquam dolorum! Reprehenderit quasi in excepturi vero! Doloremque ipsum hic voluptatibus est. Placeat deserunt et quae eveniet molestiae consequuntur nihil officia facilis quam in? Velit aperiam officiis repudiandae? Aliquid dolores, delectus fugit amet explicabo obcaecati? Perspiciatis tempora quisquam nulla, ipsa itaque beatae vitae asperiores? Assumenda, quo mollitia. Commodi id quo molestias, tempora dolor illo ipsam voluptates omnis repellat laboriosam. Blanditiis earum exercitationem fugit perferendis esse vitae, aliquam alias ducimus porro est minima assumenda optio velit iusto molestias nostrum dolores id. "
    }
  ]


export default SLIDES_DATA_TEST;


