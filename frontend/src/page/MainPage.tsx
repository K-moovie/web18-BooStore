import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FileList from '../component/FileList';

import FileMenu from '../component/FileMenu';
import Sidebar from '../component/Sidebar';
import { User } from '../model';
import { Capacity } from '../model/capacity';
import folderup from '../asset/image/folderup.svg';
import { FileDTO } from '../DTO';
import { getFiles } from '../util';

interface Props {
	user: User;
}

const MainPage: React.FC<Props> = () => {
	const [currentDir, setCurrentDir] = useState('/depth0/depth1/depth2/depth3');
	const [capacity, setCapacity] = useState<Capacity>({ currentCapacity: 0, maxCapacity: 1024 });
	const [files, setFiles] = useState<FileDTO[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<FileDTO[]>([]);

	const parentDir = (currentDirectory: string) => {
		let parentDir = currentDirectory.split('/').slice(0, -1).join('/');
		parentDir === '' ? (parentDir = '/') : '';
		// console.log('parent: ', parentDir);
		return parentDir;
	};

	const getCapacity = async () => {
		await fetch('/user/capacity', {
			credentials: 'include',
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error('something wrong');
				}
			})
			.then((data) => {
				setCapacity(data);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const onClickParentButton = async() => {
		const files = await getFiles(parentDir(currentDir));
		setFiles(files);
		setCurrentDir(parentDir(currentDir));
	};

	useEffect(() => {
		const callfile = async ()=>{
			setFiles(await getFiles(currentDir));
		};
		getCapacity();
	}, []);

	return (
		<Container>
			<Sidebar capacity={capacity} />
			<InnerContainer>
				<Directory>
					{currentDir === '/' ? (
						<ParentButton src={folderup} style={{ opacity: 0.5 }}></ParentButton>
					) : (
						<ParentButton src={folderup} onClick={onClickParentButton}></ParentButton>
					)}
					{`내 디렉토리${currentDir === '/' ? '' : currentDir.split('/').join(' > ')}`}
				</Directory>
				<Section>
					<FileMenu showShareButton capacity={capacity} setCapacity={setCapacity} selectedFiles={selectedFiles}/>
					<FileList files={files} setSelectedFiles={setSelectedFiles} setFiles={setFiles} setCurrentDir={setCurrentDir} currentDirectory={currentDir}/>
				</Section>
			</InnerContainer>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	height: calc(100vh - ${(props) => props.theme.HeaderHeight});
`;

const InnerContainer = styled.div`
	background-color: ${(props) => props.theme.color.PrimaryBG};
	padding: 25px 35px;
	width: 100%;
`;

const Directory = styled.p`
	font-size: 24px;
	border-bottom: 2px solid ${(props) => props.theme.color.Line};

	margin: 0;
	padding-bottom: 20px;
`;

const Section = styled.section`
	padding: 10px;
`;

const ParentButton = styled.img`
	width: 20px;
	height: 20px;
`;

export default MainPage;
