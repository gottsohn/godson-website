/* eslint-env mocha */
import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import Anchor from '../../app/components/shared/Anchor.jsx';

chai.use(chaiEnzyme());
describe('Anchor Component', () => {
  'use strict';
  let a = null;
  const href = 'http://gottsohn.github.io';
  const label = 'Godson';

  before(() => {
    sinon.spy(Anchor.prototype, 'render');
    a = mount(<Anchor href={href} label={label} />);
  });

  it('should call .render once after mounting', () => {
    expect(Anchor.prototype.render.calledOnce).to.equal(true);
  });

  it('should have label defined from received props', () => {
    expect(a.node.props.label).to.equal(label);
  });

  it('should have href defined from received props', () => {
    expect(a.node.props.href).to.equal(href);
  });

  it('should have target as undefined', () => {
    expect(a.node.props.target).to.be.undefined;
  });
});
