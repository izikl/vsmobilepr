import {
    ListView
} from 'react-native';
import { observable, computed, action } from 'mobx'
import { filter, startsWith, map } from 'lodash';
import { SearchListStore } from './searchListStore';

export class PullRequestsStore extends SearchListStore {
    _projectName: string; 
    _teamName: string;
    _repositoryName: string;

    @action 
    async fetchPullRequests(projectName: string, teamName: string, repositoryName: string) {
        this._projectName = projectName;
        this._teamName = teamName;
        this._repositoryName = repositoryName;
        return super.fetchData(); 
    }

    filterItems(): any[] {
        return filter(this.items, (item) => { return startsWith(item.name, this.filterTerm); });
    }

    transformData(data: any): any[] {
        return data.value;
    }

    visibleValue() {
        return "title";
    } 

    getPath(): string {
        let url = ""
        url += `https://msmobilecenter.visualstudio.com/DefaultCollection`;
        url += `/${this._projectName}`;
        url += this._teamName ? `/${this._teamName}` : "";
        url += `/_apis/git/repositories/${this._repositoryName}`
        url += `/pullRequests`
        url += "?api-version=1.0"
        return url;

    }
}