function handleSignIn() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === 'admin' && p === 'admin123') {
        alert('✅ Signed in successfully!');
    } else {
        alert('❌ Invalid credentials. Use admin / admin123');
    }
}
// showloader
const loadBox = document.getElementById("loader-container")
const showLoader = () => {
    loadBox.classList.remove("hidden");
};
const hideLoader = () => {
    loadBox.classList.add("hidden");
};

const allBtn = document.getElementById("allFilter-btn");
const openBtn = document.getElementById("allFilter-btn");
const closedBtn = document.getElementById("closedFilter-btn");

function setActiveButton(activeBtn) {
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach(button => {
        if (button === activeBtn) {
            button.classList.add("bg-gray-700", "text-white");
            button.classList.remove("border-gray-700");
        } else {
            button.classList.remove("bg-gray-700", "text-white");
            button.classList.add("border-gray-700");
        }
    });
}
window.addEventListener("DOMContentLoaded", function () {
    setActiveButton(allBtn);
});

// Fetch and display issues
const loadAllIssues = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    
    fetch(url)
        .then((res) => res.json())
        .then((data) => { 
            showLoader();
            setTimeout(() => {
                hideLoader();
                displayIssues(data.data);
            }, 400);
        });
        
};
loadAllIssues();

// Function to display issues in the DOM
const displayIssues = (issues) => {
    const issuesContainer = document.getElementById("issues-container");
    if (!issuesContainer) {
        return;
    }
    issuesContainer.innerHTML = '';
    issues.forEach((issue) => {
        const status = issue.status.toLowerCase();
        const priority = issue.priority.toLowerCase();

        // Determine priority class based on issue priority
        let priorityClass = "";
        if (priority === "high") {
            priorityClass = "bg-[#ffe8e8] text-[#ff3f46]";
        } else if (priority === "medium") {
            priorityClass = "bg-[#fff1ce] text-[#f59e0b]";
        } else {
            priorityClass = "bg-[#ebeef2] text-[#98a2b3]";
        }

        const labelStyles = {
            bug: {
                className: "border-[#ff9a9a] bg-[#fff5f5] text-[#ff4247]",
                icon: "fa-solid fa-bug",
                text: "BUG",
            },
            "help wanted": {
                className: "border-[#f7c74a] bg-[#fff9e8] text-[#e69200]",
                icon: "fa-regular fa-circle-question",
                text: "HELP WANTED",
            },
            enhancement: {
                className: "border-[#86efac] bg-[#dcfce7] text-[#10b981]",
                icon: "fa-solid fa-wand-magic-sparkles",
                text: "ENHANCEMENT",
            },
            "good first issue": {
                className: "border-[#93c5fd] bg-[#eff6ff] text-[#2563eb]",
                icon: "fa-solid fa-seedling",
                text: "GOOD FIRST ISSUE",
            },
            documentation: {
                className: "border-[#c4b5fd] bg-[#f5f3ff] text-[#7c3aed]",
                icon: "fa-regular fa-file-lines",
                text: "DOCUMENTATION",
            },
        };

        const labelPills = issue.labels
            .map((label) => label.toLowerCase())
            .filter((label) => labelStyles[label])
            .map((label) => {
                const labelStyle = labelStyles[label];
                return `<span class="inline-flex h-[22px] shrink-0 items-center gap-[3px] whitespace-nowrap rounded-full border px-2 text-[10px] font-medium leading-none ${labelStyle.className}">
                    <i class="${labelStyle.icon} shrink-0 text-[10px]"></i>${labelStyle.text}
                </span>`;
            })
            .join("");

        const issueElement = document.createElement("div");
        issueElement.className = `flex min-h-[218px] w-full min-w-0 flex-col overflow-hidden rounded-[5px] border-t-[3px] ${status === 'open' ? 'border-t-[#02c783]' : 'border-t-[#a855ff]'} bg-white shadow-md`;
        issueElement.innerHTML = `
                <div class="flex items-center justify-between px-4 pb-[9px] pt-4">
                    <img class="h-[21px] w-[21px] object-contain" src="${status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="${status === 'open' ? 'Open' : 'Closed'} status">
                    <span
                        class="inline-flex h-[23px] min-w-[76px] shrink-0 items-center justify-center whitespace-nowrap rounded-full ${priorityClass} px-[14px] text-[12px] font-medium leading-none">${issue.priority.toUpperCase()}</span>
                </div>
                <h2 class="m-0 min-h-[35px] overflow-hidden px-4 text-[12px] font-semibold leading-[1.45] text-[#1f2937] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">${issue.title}</h2>
                <p class="m-0 mt-[7px] min-h-[31px] overflow-hidden px-4 text-[11px] leading-[1.4] text-[#64748b] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">${issue.description}</p>

                <div class="flex min-h-[77px] flex-wrap content-start gap-[6px] px-4 pb-[15px] pt-3">
                    ${labelPills}
                </div>
                <div class="mt-auto border-t border-[#e5e7eb] px-4 pt-[14px]">
                    <p class="m-0 mb-[9px] text-[11px] leading-none text-[#64748b]">#1 <span>${issue.author}</span></p>
                    <p class="m-0 mb-[15px] text-[11px] leading-none text-[#64748b]">${issue.createdAt}</p>
                </div>
        `;
        issuesContainer.appendChild(issueElement);
    });
};


