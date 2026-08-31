import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontSizeOptions,
	OptionType,
	fontFamilyOptions,
} from 'src/constants/articleProps';
import { useState, useRef } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

export const ArticleParamsForm = ({
	onApply,
}: {
	onApply: (state: typeof defaultArticleState) => void;
}) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
	const closeSidebar = () => setIsSidebarOpen(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const handleChange = (
		fieldName: keyof typeof defaultArticleState,
		option: OptionType
	) => {
		setFormState((prev) => ({ ...prev, [fieldName]: option }));
	};

	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef: sidebarRef,
		onClose: closeSidebar,
		onChange: closeSidebar,
	});

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(
					styles.container,
					isSidebarOpen && styles.container_open
				)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						onApply(formState);
					}}
					onReset={() => {
						setFormState(defaultArticleState);
						onApply(defaultArticleState);
					}}>
					<div style={{ paddingBottom: 50 }}>
						<Text as='h1' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
					</div>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title='размер шрифта'
						name='размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
