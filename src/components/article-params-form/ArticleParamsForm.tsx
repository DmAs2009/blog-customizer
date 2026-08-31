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
import { useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = ({
	isSidebarOpen,
	onToggle,
	onApply,
}: {
	isSidebarOpen: boolean;
	onToggle: () => void;
	onApply: (state: typeof defaultArticleState) => void;
}) => {
	const [formState, setFormState] = useState(defaultArticleState);
	const handleChange = (
		fieldName: keyof typeof defaultArticleState,
		option: OptionType
	) => {
		setFormState((prev) => ({ ...prev, [fieldName]: option }));
	};

	const handleApply = () => {
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		if (isSidebarOpen) {
			const timerId = setTimeout(() => {
				document.addEventListener('mousedown', handleClickOutside);
			}, 0);

			return () => {
				clearTimeout(timerId);
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [isSidebarOpen, onToggle]);

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isSidebarOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={(e) => e.preventDefault()}>
					<h1 className={styles.header}>Задайте параметры</h1>
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
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
