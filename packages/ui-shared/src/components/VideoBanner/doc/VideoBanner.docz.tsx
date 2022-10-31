import { IContent, ButtonColor, TextColor } from '../VideoBanner';
import imageDesktop from './bg_grey_desktop.png';
import imageMobile from './bg_grey_mobile.png';
import imageWhiteDesktop from './image_white_desktop.png';
import imageWhiteMobile from './image_white_mobile.png';
import video from './video.mp4';

const youtubeVideoId = '2Sps5MnvlKM';

const contentWithDefaultTextColor: IContent = {
    title: 'Текст ≈40 символов. Короткие слова',
    description:
        'Описание должно быть примерно не более 130 символов. Пишите содержательно, кратко и не будет проблем с текстовым контентом.',
    buttonHref: '#',
    buttonTitle: 'Текст в кнопке',
    linkTitle: 'Личный кабинет услуги',
    linkUrl: '#',
    cost: 'oт <b>1000 ₽</b> за сообщение',
};

const contentWithDifferentTextColor: IContent = {
    ...contentWithDefaultTextColor,
    textColor: TextColor.BLACK,
    textColorMobile: TextColor.WHITE,
};

const content: IContent = {
    ...contentWithDefaultTextColor,
    textColor: TextColor.WHITE,
};

const contentWithPurpleButton: IContent = {
    ...content,
    buttonColor: ButtonColor.PURPLE,
};

const contentWithHtml: IContent = {
    ...content,
    title: '<a href="https://moscow.megafon.ru">Текст</a><br><font color="#731982">≈40</font> символов.&nbspКороткие слова',
    description:
        'Описание&nbspдолжно <a href="https://moscow.megafon.ru">быть</a> <font color="#731982">примерно</font> не более 130 символов.<br>Пишите содержательно, кратно и не будет проблем с текстовым контентом.',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { buttonTitle, ...contentWithoutButton }: IContent = content;

const images = {
    imageMobile: imageWhiteMobile,
    imageTablet: imageWhiteMobile,
    imageDesktop: imageWhiteDesktop,
    imageDesktopWide: imageWhiteDesktop,
};

const breadcrumbs = [
    {
        title: 'МегаФон',
        href: '#',
    },
    {
        title: 'Мобильная связь',
        href: '#',
    },
    {
        title: 'Тарифы',
        href: '#',
    },
];

export {
    content,
    contentWithDefaultTextColor,
    contentWithDifferentTextColor,
    contentWithPurpleButton,
    contentWithoutButton,
    contentWithHtml,
    video,
    youtubeVideoId,
    imageMobile,
    imageDesktop,
    images,
    breadcrumbs,
};
