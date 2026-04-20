import styled from 'styled-components';
import { FaMars, FaVenus } from 'react-icons/fa';

import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import Input from './components/Input';
import RangeInput from './components/RangeInput';

import { PedHeadBlend, HeadBlendSettings } from './interfaces';

const ParentPreview = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 4px;
`;

const ParentCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  border-radius: ${props => props.theme.borderRadius || '6px'};
  background: rgba(30, 30, 32, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.05);

  .silhouette {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.55);
  }

  .label {
    font-size: 11px;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.55);
  }

  .value {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }
`;

interface HeadBlendProps {
  settings: HeadBlendSettings;
  storedData: PedHeadBlend;
  data: PedHeadBlend;
  handleHeadBlendChange: (key: keyof PedHeadBlend, value: number) => void;
}

const HeadBlend = ({ settings, storedData, data, handleHeadBlendChange }: HeadBlendProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.headBlend.title}>
      <Item title={locales.headBlend.shape.title}>
        <ParentPreview>
          <ParentCard>
            <div className="silhouette">
              <FaMars size={22} />
            </div>
            <span className="label">{locales.headBlend.shape.firstOption}</span>
            <span className="value">#{data.shapeFirst}</span>
          </ParentCard>
          <ParentCard>
            <div className="silhouette">
              <FaVenus size={22} />
            </div>
            <span className="label">{locales.headBlend.shape.secondOption}</span>
            <span className="value">#{data.shapeSecond}</span>
          </ParentCard>
        </ParentPreview>
        <Input
          title={locales.headBlend.shape.firstOption}
          min={settings.shapeFirst.min}
          max={settings.shapeFirst.max}
          defaultValue={data.shapeFirst}
          clientValue={storedData.shapeFirst}
          onChange={value => handleHeadBlendChange('shapeFirst', value)}
        />
        <Input
          title={locales.headBlend.shape.secondOption}
          min={settings.shapeSecond.min}
          max={settings.shapeSecond.max}
          defaultValue={data.shapeSecond}
          clientValue={storedData.shapeSecond}
          onChange={value => handleHeadBlendChange('shapeSecond', value)}
        />
        <RangeInput
          title={locales.headBlend.shape.mix}
          min={settings.shapeMix.min}
          max={settings.shapeMix.max}
          factor={settings.shapeMix.factor}
          defaultValue={data.shapeMix}
          clientValue={storedData.shapeMix}
          onChange={value => handleHeadBlendChange('shapeMix', value)}
        />
      </Item>
      <Item title={locales.headBlend.skin.title}>
        <Input
          title={locales.headBlend.skin.firstOption}
          min={settings.skinFirst.min}
          max={settings.skinFirst.max}
          defaultValue={data.skinFirst}
          clientValue={storedData.skinFirst}
          onChange={value => handleHeadBlendChange('skinFirst', value)}
        />
        <Input
          title={locales.headBlend.skin.secondOption}
          min={settings.skinSecond.min}
          max={settings.skinSecond.max}
          defaultValue={data.skinSecond}
          clientValue={storedData.skinSecond}
          onChange={value => handleHeadBlendChange('skinSecond', value)}
        />
        <RangeInput
          title={locales.headBlend.skin.mix}
          min={settings.skinMix.min}
          max={settings.skinMix.max}
          factor={settings.skinMix.factor}
          defaultValue={data.skinMix}
          clientValue={storedData.skinMix}
          onChange={value => handleHeadBlendChange('skinMix', value)}
        />
      </Item>
      <Item title={locales.headBlend.race.title}>
        <Input
            title={locales.headBlend.race.shape}
            min={settings.shapeThird.min}
            max={settings.shapeThird.max}
            defaultValue={data.shapeThird}
            clientValue={storedData.shapeThird}
            onChange={value => handleHeadBlendChange('shapeThird', value)}
        />
        <Input
          title={locales.headBlend.race.skin}
          min={settings.skinThird.min}
          max={settings.skinThird.max}
          defaultValue={data.skinThird}
          clientValue={storedData.skinThird}
          onChange={value => handleHeadBlendChange('skinThird', value)}
        />
        <RangeInput
          title={locales.headBlend.race.mix}
          min={settings.thirdMix.min}
          max={settings.thirdMix.max}
          factor={settings.thirdMix.factor}
          defaultValue={data.thirdMix}
          clientValue={storedData.thirdMix}
          onChange={value => handleHeadBlendChange('thirdMix', value)}
        />
      </Item>
    </Section>
  );
};

export default HeadBlend;
