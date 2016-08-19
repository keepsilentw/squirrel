#git-keys

##branch
	- 列出分支            git branch (-a / -r)
	- 切换分支            git checkout “branch"
	- 新建分支            git checkout -b "branch"
	- 删除分支            git branch -d / -D "branch"
	- 合并分支            git merge "branch"
	- 重命名分支          git branch -m / -M "branch"

##push
	- 查看状态            git status
	- 添加文件            git add . / *.js / sample.js
	- 提交修改            git commit -m "" (-a)
	- 撤销修改            git checkout head . / *.js / sample.js
	- 查看历史            git log (-n)
	- 删除最近一次提交     git reset --hard HEAD~1 , git push -f
	- 增补提交(无log)     git commit -C head -a --amend
	- 推入远程库          git push origin "branch"

##stash
	- 缓存修改            git stash
	- 查看缓存            git stash list
	- 删除缓存            git stash clear
	- 获取缓存            git stash pop / apply
	- 获取指定缓存         git stash apply stash@{1}

##pull
	- 获取远程分支         git pull origin "branch"
	- 获取但不合并         git fetch origin "branch"
	- 合并分支            git merge origin "branch"
	- 复位分支            git rebase origin "branch"
	- 完整拉取            git pull -p

##tag
	- 查看标签            git tag
	- 新增标签            git tag -a v1.0.0 -m 'release version 1.0.0'
	- 删除本地标签         git tag -d v1.0.0
	- 删除远程标签         git push origin :refs/tags/v1.0.0
	- 指定标签推入远程     git push origin tag v1.0.0
	- 所有标签推入远程     git push origin --tags

##advanced
	- 清理本地版本库       git gc --prune now
	- 获取特定次提交       git clone --depth=n
	- 增补提交顺序
     1.git add .
     2.git commit --amend
     3.git push origin -f
