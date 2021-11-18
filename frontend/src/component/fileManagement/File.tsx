import React, { useEffect, useState } from 'react';
import styled, { ThemeConsumer } from 'styled-components';
import { convertByteToUnitString, getDate, getFiles } from '@util';
import { FileDTO } from '@DTO';
import FileIcon from './FileIcon';

interface Props {
	file: FileDTO;
	setSelectedFiles: React.Dispatch<React.SetStateAction<FileDTO[]>>;
	setCurrentDir: React.Dispatch<React.SetStateAction<string>>;
	currentDirectory: string;
}

const File: React.FC<Props> = ({ file, setSelectedFiles, setCurrentDir, currentDirectory }) => {
	const [isSelected, setSelected] = useState(false);

	const { contentType, name, createdAt, updatedAt, size, _id } = file;
	const isFolder = contentType === 'folder';
	const getConvertedSize = convertByteToUnitString(size);

	const onClickFile = (event: React.MouseEvent<HTMLDivElement>) => {
		setSelected((prev) => !prev);
		setSelectedFiles((selectedFiles) => {
			const result = [...selectedFiles];
			const element = selectedFiles.find((ele) => {
				return ele._id == _id;
			});

			if (typeof element === 'undefined') {
				result.push({ ...file });
				return result;
			}

			return result.filter((ele) => ele._id !== _id);
		});
	};

	const changeCurrentDirectory = async () => {
		if (isFolder) {
			const childDir =
				currentDirectory === '/' ? currentDirectory + name : currentDirectory + '/' + name;
			setCurrentDir(childDir);
		}
	};

	useEffect(() => {
		// 디렉토리가 변경되면 선택 상태를 false로 초기화
		setSelected(false);
	}, [currentDirectory]);

	return (
		<Container onClick={onClickFile} isSelected={isSelected}>
			<p>{isFolder}</p>
			<FileIcon type={contentType} />
			<FileNameBox>
				<FileName isFolder={isFolder} onClick={changeCurrentDirectory}>
					{name}
				</FileName>
			</FileNameBox>

			<MetaData> {getDate(createdAt)} </MetaData>
			<MetaData> {getDate(updatedAt)} </MetaData>
			<MetaData> {isFolder ? '-' : getConvertedSize} </MetaData>
		</Container>
	);
};

const Container = styled.div<{ isSelected: boolean }>`
	display: grid;
	align-items: center;
	grid-template-columns: 20px 60px minmax(100px, 7fr) 3fr 3fr 2fr;
	border-bottom: 1px solid ${(props) => props.theme.color.Line};
	background-color: ${({ isSelected, theme }) => isSelected && theme.color.SecondaryBG};
	&:hover {
		background-color: ${({ theme }) => theme.color.SecondaryBG};
	}
`;
const FileNameBox = styled.div`
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	
	padding-right: 10%;
`;

const FileName = styled.span<{ isFolder: boolean }>`
	font: ${(props) => props.theme.fontSize.Content} ${(props) => props.theme.FontFamily.Medium};
	color: ${(props) => props.theme.color.Content};
	&:hover {
		cursor: default;
	}
	margin: auto;
	margin-left: 0;
`;

const MetaData = styled.p`
	font: ${(props) => props.theme.fontSize.Content} ${(props) => props.theme.FontFamily.Medium};
	color: ${(props) => props.theme.color.MetaData};
`;

export default React.memo(File);
