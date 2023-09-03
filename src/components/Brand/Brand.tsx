import React from 'react';
import { View, Image, DimensionValue } from 'react-native';
import { useTheme } from '../../hooks';

type Props = {
  height?: DimensionValue;
  width?: DimensionValue;
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

const Brand = ({ height, width, mode }: Props) => {
  const { Images } = useTheme();

  return (
    <View
      testID={'brand-img-wrapper'}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        height,
        width,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        testID={'brand-img'}
        style={{ height, width }}
        source={Images.logo}
        resizeMode={mode}
      />
    </View>
  );
};

Brand.defaultProps = {
  height: 100,
  width: 100,
  mode: 'contain',
};

export default Brand;
