import * as React from 'react';
import { cnCreate, filterDataAttrs } from '@megafon/ui-helpers';
import * as PropTypes from 'prop-types';
import './ContentArea.less';

const BACKGROUND_COLORS = {
    TRANSPARENT: 'transparent',
    BLACK: 'black',
    WHITE: 'white',
    GREEN: 'green',
    PURPLE: 'purple',
    SPB_SKY_0: 'spbSky0',
    SPB_SKY_1: 'spbSky1',
    SPB_SKY_2: 'spbSky2',
} as const;

export type BackgroundColorType = typeof BACKGROUND_COLORS[keyof typeof BACKGROUND_COLORS];

const DisableIndents = {
    MOBILE: 'mobile',
    MOBILE_TABLET: 'mobile-tablet',
    TABLET_DESKTOP: 'tablet-desktop',
    ALL: 'all',
} as const;

type DisableIndentsType = typeof DisableIndents[keyof typeof DisableIndents];

export interface IConrentAreaProps {
    /** Фоновый цвет внешнего контейнера */
    outerBackgroundColor?: BackgroundColorType;
    /** Фоновый цвет внутреннего контейнера */
    innerBackgroundColor?: BackgroundColorType;
    /** Отключение отступов на различных разрешениях */
    disableIndents?: DisableIndentsType;
    /** Дополнительные классы для корневого элемента */
    className?: string;
    /** Дополнительные классы для корневого и внутренних элементов */
    classes?: {
        root?: string;
        inner?: string;
    };
    /** Дополнительные data атрибуты к внутренним элементам */
    dataAttrs?: {
        root?: Record<string, string>;
        inner?: Record<string, string>;
    };
}

const cn = cnCreate('mfui-content-area');
const ContentArea: React.FC<IConrentAreaProps> = ({
    outerBackgroundColor = 'transparent',
    innerBackgroundColor = 'transparent',
    disableIndents,
    children,
    className,
    classes,
    dataAttrs,
}) => (
    <div
        {...filterDataAttrs(dataAttrs?.root)}
        className={cn({ 'background-color': outerBackgroundColor }, [className, classes?.root])}
    >
        <div
            {...filterDataAttrs(dataAttrs?.inner)}
            className={cn(
                'inner',
                {
                    'disable-indents': disableIndents,
                    'background-color': innerBackgroundColor,
                },
                classes?.inner,
            )}
        >
            {children}
        </div>
    </div>
);

ContentArea.propTypes = {
    disableIndents: PropTypes.oneOf(Object.values(DisableIndents)),
    className: PropTypes.string,
    classes: PropTypes.shape({
        root: PropTypes.string,
        inner: PropTypes.string,
    }),
    dataAttrs: PropTypes.shape({
        root: PropTypes.objectOf(PropTypes.string.isRequired),
        inner: PropTypes.objectOf(PropTypes.string.isRequired),
    }),
    outerBackgroundColor: PropTypes.oneOf(Object.values(BACKGROUND_COLORS)),
    innerBackgroundColor: PropTypes.oneOf(Object.values(BACKGROUND_COLORS)),
};

export default ContentArea;
