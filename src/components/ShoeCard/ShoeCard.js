import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeVariantMap = {
  'new-release': 'New Release!',
  'on-sale': 'Sale',
  default: '',
}

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantText = ShoeVariantMap[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        {variantText ? <Variant variant={variant}>{variantText}</Variant> : null}
        <ImageWrapper>
          <Image alt={
            `${name} shoe`
          } src={imageSrc} />
        </ImageWrapper>
        <Spacer size={14} />
        <Row>
          <Name>{name}</Name>
          <Price
            activeSales={!!salePrice}
          >{formatPrice(price)}</Price>
        </Row>
        <Spacer size={6} />
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Variant = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  padding: 8px;
  border-radius: 2px;
  color: ${COLORS.white};
  font-weight: 700;
  font-size: ${14 / 16}rem;
  background-color: ${({ variant }) => {
    if (variant === 'on-sale') {
      return COLORS.primary;
    }
    return COLORS.secondary;
  }};
  z-index: 1;
`;


const Link = styled.a`
  text-decoration: none;
  color: inherit;
  display: flex;
  flex: 1;
  margin-bottom: 32px;
  min-width: 344px;
  width: 100%;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  flex:1;
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;


const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
 margin-right:7px;
 color: ${({ activeSales }) => (activeSales ? COLORS.gray[700] : COLORS.gray[900])};
  text-decoration: ${({ activeSales }) => (activeSales ? 'line-through' : 'none')};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  margin-right: 7px;
`;

export default ShoeCard;
