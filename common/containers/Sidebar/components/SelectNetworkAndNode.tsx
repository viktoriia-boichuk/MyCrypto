import React, { Component } from 'react';
import { connect } from 'react-redux';

import { translateRaw } from 'translations';
import { NetworkConfig } from 'types/network';
import { NodeConfig } from 'types/node';
import { AppState } from 'features/reducers';
import {
  configNodesSelectors,
  configNodesSelectedActions,
  configNetworksActions,
  configSelectors,
  configNodesCustomActions
} from 'features/config';
import { sidebarActions } from 'features/sidebar';
import { CORE_NETWORKS, generateNetworksToNodes, splitUpNetworkOptions } from '../helpers';
import NetworkOption from './NetworkOption';

interface Props {
  selectedNode: NodeConfig;
  selectedNetwork: NetworkConfig;
  allNodes: NodeConfig[];
  allNetworks: { [key: string]: NetworkConfig };
  changeNodeRequested: configNodesSelectedActions.TChangeNodeRequested;
  changeNetworkRequested: configNetworksActions.TChangeNetworkRequested;
  addCustomNode: configNodesCustomActions.TAddCustomNode;
  closeSidebar: sidebarActions.TCloseSidebar;
}

interface State {
  toggledNetworks: string[];
  showingSecondaryNetworks: boolean;
  showingCustomNodeModal: boolean;
}

class SelectNetworkAndNode extends Component<Props, State> {
  public state: State = {
    toggledNetworks: [],
    showingSecondaryNetworks: false,
    showingCustomNodeModal: false
  };

  public componentDidMount() {
    const { selectedNode } = this.props;
    const showingSecondaryNetworks = !CORE_NETWORKS.includes(selectedNode.network);
    const toggledNetworks =
      selectedNode.isCustom || !selectedNode.isAuto ? [selectedNode.network] : [];

    this.setState({
      showingSecondaryNetworks,
      toggledNetworks
    });
  }

  public render() {
    const { selectedNode, selectedNetwork, allNodes, allNetworks } = this.props;
    const { toggledNetworks } = this.state;
    const networksToNodes = generateNetworksToNodes(allNodes);
    const { primaryNetworks } = splitUpNetworkOptions(networksToNodes);

    return (
      <section className="SidebarScreen">
        <section className="SidebarScreen-upper">
          <h1 className="SidebarScreen-heading">{translateRaw('NEW_SIDEBAR_TEXT_2')}</h1>
        </section>
        <ul className="SidebarScreen-list">
          {primaryNetworks.map(({ network, nodes }: { network: string; nodes: NodeConfig[] }) => {
            const isSelected = selectedNetwork.id === network;
            const onSelect = () => this.handleNetworkSelect(allNetworks[network].id);
            const onNodeSelect = (node: string) => this.handleNodeSelect(node);
            const onClick = (e: React.MouseEvent<HTMLElement>) => {
              e.stopPropagation();
              this.toggleNetwork(network);
            };
            const name = allNetworks[network].name;
            const isToggled = toggledNetworks.includes(network);

            return (
              <NetworkOption
                key={network}
                onSelect={onSelect}
                onNodeSelect={onNodeSelect}
                onClick={onClick}
                name={name}
                isToggled={isToggled}
                nodes={nodes}
                isSecondary={false}
                isSelected={isSelected}
                selectedNode={selectedNode}
              />
            );
          })}
        </ul>
      </section>
    );
  }

  private toggleNetwork = (network: string) =>
    this.setState((prevState: State) => ({
      toggledNetworks: prevState.toggledNetworks.includes(network)
        ? prevState.toggledNetworks.filter(toggledNetwork => toggledNetwork !== network)
        : prevState.toggledNetworks.concat(network)
    }));

  private handleNetworkSelect = (network: string) => {
    const { changeNetworkRequested, closeSidebar } = this.props;

    changeNetworkRequested(network);
    closeSidebar();
  };

  private handleNodeSelect = (node: string) => {
    const { changeNodeRequested, closeSidebar } = this.props;

    changeNodeRequested(node);
    closeSidebar();
  };
}

const mapStateToProps = (state: AppState) => ({
  selectedNode: configNodesSelectors.getNodeConfig(state),
  selectedNetwork: configSelectors.getNetworkConfig(state),
  allNodes: configSelectors.getAllNodes(state),
  allNetworks: configSelectors.getAllNetworkConfigs(state)
});

const mapDispatchToProps = {
  changeNodeRequested: configNodesSelectedActions.changeNodeRequested,
  changeNetworkRequested: configNetworksActions.changeNetworkRequested,
  closeSidebar: sidebarActions.closeSidebar,
  addCustomNode: configNodesCustomActions.addCustomNode
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNetworkAndNode as any);
