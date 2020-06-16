import * as React from 'react';
import { shallow, mount } from 'enzyme';
import Search , { ISearchProps } from './Search';
import cnCreate from 'utils/cnCreate';

let mockedDebounce;
jest.mock('lodash.debounce', () => {
    mockedDebounce = jest.fn().mockImplementation((fn) => fn);
    return mockedDebounce;
});

const cn = cnCreate('mfui-search');

const props: ISearchProps = {
    value: 'initial value',
    placeholder: 'type to search here',
    onChange: jest.fn(),
    onSubmit: jest.fn(),
    items: [
        {
            title: 'item title',
            value: 'item value',
        },
        {
            title: 'another title',
            value: 'another value',
        },
    ],
};

describe('<Search />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('snapshots', () => {
        it('renders Search without props correctly', () => {
            const wrapper = shallow(<Search />);
            expect(wrapper).toMatchSnapshot();
        });

        it('renders Search with all props correctly', () => {
            const wrapper = shallow(<Search {...props} />);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('typing', () => {
        it('calls onChange while typing in the field with delay', () => {
            const wrapper = shallow(<Search {...props} />);
            wrapper.find(`.${cn('search-field')}`).simulate('change', {
                target: {
                    value: 'new value',
                },
            });
            expect(mockedDebounce).toBeCalledWith(expect.any(Function), 250);
            expect(props.onChange).toBeCalledWith('new value');
        });
    });

    describe('submitting', () => {
        it('calls onSubmit on icon click', () => {
            const wrapper = shallow(<Search {...props} />);
            wrapper.find(`.${cn('icon-box')}`).simulate('click');
            expect(props.onSubmit).toBeCalledWith(props.value);
        });

        it('calls onSubmit on press Enter with focus on input', () => {
            const wrapper = shallow(<Search {...props} />);
            wrapper.find(`.${cn('search-field')}`).simulate('keyDown', { key: 'Enter' });
            expect(props.onSubmit).toBeCalledWith(props.value);
        });

        it('calls onSubmit on press Enter with value from items', () => {
            const wrapper = mount(<Search {...props} />);
            wrapper.find(`.${cn('list-item')}`).at(0).simulate('mouseenter');
            wrapper.find(`.${cn('search-field')}`).simulate('keyDown', { key: 'Enter' });

            expect(props.onSubmit).toBeCalledWith('item title');
        });

        it('calls onSubmit by clicking on item', () => {
            const wrapper = mount(<Search {...props} />);
            wrapper.find(`.${cn('list-item')}`).at(0).simulate('mouseenter');
            wrapper.find(`.${cn('list-item')}`).at(0).simulate('mousedown');

            expect(props.onSubmit).toBeCalledWith('item title');
        });
    });

    describe('keyboard actions', () => {
        it('handles ArrowUp and ArrowDown correctly', () => {
            const wrapper = mount(<Search {...props} />);
            const searchField = wrapper.find(`.${cn('search-field')}`);
            const listItem = `.${cn('list-item')}`;
            const listItemActive = 'mfui-search__list-item_active';

            searchField.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {}});
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);

            searchField.simulate('keyDown', { key: 'ArrowDown', preventDefault: () => {}});
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(false);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(true);

            searchField.simulate('keyDown', { key: 'ArrowUp', preventDefault: () => {}});
            expect(wrapper.find(listItem).at(0).hasClass(listItemActive)).toEqual(true);
            expect(wrapper.find(listItem).at(1).hasClass(listItemActive)).toEqual(false);
        });
    });
});