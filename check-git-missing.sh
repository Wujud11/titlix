#!/bin/bash

echo "🔍 الملفات غير المضافة (untracked):"
git ls-files --others --exclude-standard

echo ""
echo "📂 المجلدات الفارغة:"
find . -type d -empty | grep -v "\.git"
