import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as ExpandOnSvg } from '../../asset/image/expand_more.svg';
import { ReactComponent as ExpandOffSvg } from '../../asset/image/chevron_left.svg';
import { ReactComponent as StarSvg } from '../../asset/image/icons/icon_star.svg';
import { ReactComponent as TrashSvg } from '../../asset/image/icons/icon_trash.svg';
import { Capacity } from '../../model';
import { convertByteToGB, convertByteToMB, convertByteToKB } from '../../util';
import ProgressBar from '../common/ProgressBar';

import { themeValue } from '../../asset/style/theme';

const KB = Math.pow(1024, 1);
const MB = Math.pow(1024, 2);
const GB = Math.pow(1024, 3);

const applyCapacityValueToUnit = (value: number) => {
	if (value < MB) {
		return `${parseFloat(convertByteToKB(value).toFixed(1))}KB`;
	} else if (value < GB) {
		return `${parseFloat(convertByteToMB(value).toFixed(1))}MB`;
	}
	return `${parseFloat(convertByteToGB(value).toFixed(1))}GB`;
};

//1GB 중 503.1MB 사용
const convertCapacityToString = (capacity: Capacity) => {
	const { currentCapacity, maxCapacity } = capacity;
	const currentCapacityString = applyCapacityValueToUnit(currentCapacity);
	const maxCapacityString = applyCapacityValueToUnit(maxCapacity);

	return `${maxCapacityString} 중 ${currentCapacityString} 사용`;
};

interface Props {
	capacity: Capacity;
	className?: string;
}

const Sidebar: React.FC<Props> = ({ capacity, className }) => {
	const { currentCapacity, maxCapacity } = capacity;
	const { Point: PointColor } = themeValue.color;

	return (
		<Container className={className}>
			<CapacityContainer>
				<CapacityBar value={currentCapacity} maxValue={maxCapacity} color={PointColor} />
				<ProgressValue>{`${convertCapacityToString(capacity)}`}</ProgressValue>
			</CapacityContainer>
			<DirectoryList/ >
			<Footer>
				<FooterNav>
					<StarSvg />
					<span> 중요 문서함 </span>
				</FooterNav>
				<FooterNav>
					<TrashSvg />
					<span> 휴지통 </span>
				</FooterNav>
			</Footer>
		</Container>
	);
};

const Container = styled.div`
	min-width: 250px;
	max-width: 300px;
	height: 100%;
	background-color: ${(props) => props.theme.color.PrimaryBG};
	border-right: 1px solid ${(props) => props.theme.color.Line};
	
	display: flex;
	flex-direction: column;
	
	color: ${(props) => props.theme.color.Content};
`;

const CapacityContainer = styled.div`
	padding: ${(props) => props.theme.padding.Content};
	padding-left: 30px;
	padding-right: 30px;

	display: flex;
	flex-direction: column;
	align-items: center;

	border-bottom: 1px solid ${(props) => props.theme.color.Line};
`;
const CapacityBar = styled(ProgressBar)`
	margin-bottom: 15px;
	width: 100%;
	height: 11px;
`;

const ProgressValue = styled.p`
	margin: 0;
	font-size: ${(props) => props.theme.fontSize.ContentSmall};
`;

const DirectoryList = styled.nav`
`;

const Footer = styled.div`
	display: flex;
	border-top: 1px solid ${(props) => props.theme.color.Line};
	
	width: 100%;
	height: 50px;
	margin-top: auto;
	
	> * {
		border-right: 1px solid ${(props) => props.theme.color.Line};
	}
	
	> *:last-child {
		border-right: none;
	}
`;

const FooterNav = styled.a`
	cursor: pointer;

	display: flex;
	width: 100%;
	height: 100%;
	padding: 0 15px;
	
	align-items: center;
	
	> *:first-child {
		margin-right: 10px;
	}
`;

export default Sidebar;
